import { IItemsGroupService } from "../services/interfaces/itemsGroup";
import { IItemsGroupController } from "./interfaces/itemsGroup";

export class ItemsGroupController implements IItemsGroupController {
  private readonly itemsGroupService: IItemsGroupService;

  constructor(ItemsGroupService: IItemsGroupService) {
    this.itemsGroupService = ItemsGroupService;
  }
}