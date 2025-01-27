import { IItemRepository } from "../repositories/interfaces/item";
import { IItemService } from "./interfaces/item";

export class ItemService implements IItemService {
  private readonly itemRepository: IItemRepository;

  constructor(ItemRepository: IItemRepository) {
    this.itemRepository = ItemRepository;
  }
}