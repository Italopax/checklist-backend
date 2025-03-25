import { ItemCreateInput, ItemUpdateInput, ItemType } from "../../models/entitiesTypes";
import { Session } from "../../models/interfaces";

export interface IItemService {
  createItem(session: Session, itemInfos: ItemCreateInput): Promise<ItemType>;
  selectItems(session: Session, itemsGroupId: number): Promise<ItemType[]>;
  updateItem(session: Session, itemId: number, itemInfos: ItemUpdateInput): Promise<ItemType>;
  deleteItem(session: Session, itemId: number): Promise<void>;
}
