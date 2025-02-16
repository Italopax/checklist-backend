import { ObjectLiteral, Repository } from "typeorm";

export const attributesSelector = <T extends ObjectLiteral>(repository: Repository<T>, columnsToRemove: string[]): { [key: string]: boolean } => {
  const tableColumns: string[] = repository.metadata.columns.map((column) => column.propertyName);

  const columnsSelected = tableColumns.reduce((attributesSelected: { [key: string]: boolean }, currentAttribute: string) => {
    columnsToRemove.includes(currentAttribute) ? attributesSelected[currentAttribute] = false : attributesSelected[currentAttribute] = true;

    return attributesSelected;
  }, {});
  
  return columnsSelected;
}

export const validateEmail = (email: string | undefined): boolean => {
  if (!email) return false;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};