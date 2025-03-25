import { ItemCreateInput, ItemUpdateInput, ItemType } from "../../models/entitiesTypes";

export interface IItemRepository {
  create(itemInfos: ItemCreateInput): Promise<ItemType>;
  selectById(id: number): Promise<ItemType>;
  selectByItemsGroupId(itemsGroupId: number): Promise<ItemType[]>;
  selectByName(itemsGroupId: number, name: string): Promise<ItemType>;
  selectByIdWithItemsGroupAndUser(id: number): Promise<ItemType>;
  update(id: number, itemInfos: ItemUpdateInput): Promise<ItemType>;
  delete(id: number): Promise<void>;
}
