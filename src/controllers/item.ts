import { IItemService } from "../services/interfaces/item";
import { IItemController } from "./interfaces/item";

export class ItemController implements IItemController {
  private readonly itemService: IItemService;

  constructor(ItemService: IItemService) {
    this.itemService = ItemService;
  }
}