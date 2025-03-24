import { ItemsGroupCreateInput, ItemsGroupType } from "../../models/entitiesTypes";

export interface IItemsGroupRepository {
  create(itemsGroupInfos: ItemsGroupCreateInput): Promise<ItemsGroupType>;
  update(id: number, itemsGroupInfos: Partial<ItemsGroupType>): Promise<ItemsGroupType>;
  selectById(id: number): Promise<ItemsGroupType>;
  selectByName(userId: number, name: string): Promise<ItemsGroupType>;
  selectAllFromUserId(userId: number): Promise<ItemsGroupType[]>;
}
