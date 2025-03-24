import { ItemsGroupUpdateInput, ItemsGroupType, ItemsGroupCreateInput } from "../../models/entitiesTypes";
import { Session } from "../../models/interfaces";

export interface IItemsGroupService {
  createItemsGroup(session: Session, itemsGroupInfos: ItemsGroupCreateInput): Promise<ItemsGroupType>;
  selectAllItemsGroup(session: Session): Promise<ItemsGroupType[] | null>;
  updateItemsGroup(session: Session, itemsGroupId: number, itemsGroupInfos: ItemsGroupUpdateInput): Promise<ItemsGroupType | null>;
  deleteItemsGroup(session: Session, itemsGroupId: number): Promise<void>;
}
