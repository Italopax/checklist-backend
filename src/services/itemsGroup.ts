import { IItemsGroupRepository } from "../repositories/interfaces/itemsGroup";
import { IItemsGroupService } from "./interfaces/itemsGroup";

export class ItemsGroupService implements IItemsGroupService {
  private readonly itemsGroupRepository: IItemsGroupRepository;

  constructor(ItemsGroupRepository: IItemsGroupRepository) {
    this.itemsGroupRepository = ItemsGroupRepository;
  }
}