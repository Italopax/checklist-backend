import { ItemCreateInput, ItemUpdateInput } from "../models/entitiesTypes";
import { IItemService } from "../services/interfaces/item";
import { HttpStatus } from "../utils/error";
import { IItemController } from "./interfaces/item";
import { Request, Response } from "express";

export class ItemController implements IItemController {
  private readonly itemService: IItemService;

  constructor(ItemService: IItemService) {
    this.itemService = ItemService;
  }

  public selectAllFromItemsGroup = async (request: Request, response: Response): Promise<void> => {
    const itemsGroupId: number = Number(request.params.itemsGroupId);
    const itemList = await this.itemService.selectItems(request.session, itemsGroupId);

    response.status(HttpStatus.OK).send({
      data: itemList,
    });
  }

  public update = async (request: Request, response: Response): Promise<void> => {
    const itemInfosToUpdate: ItemUpdateInput = {
      name: request.body.name,
      isChecked: request.body.isChecked,
    }

    const id: number = Number(request.params.id);

    const itemUpdated = await this.itemService.updateItem(request.session, id, itemInfosToUpdate);
    response.status(HttpStatus.OK).send({
      data: itemUpdated,
    });
  }

  public create = async (request: Request, response: Response): Promise<void> => {
    const itemInfosToCreate: ItemCreateInput = {
      name: request.body.name,
      itemsGroupId: request.body.itemsGroupId,
    }

    const itemCreated = await this.itemService.createItem(request.session, itemInfosToCreate);
    response.status(HttpStatus.CREATED).send({
      data: itemCreated,
    });
  }

  public delete = async (request: Request, response: Response): Promise<void> => {
    const id: number = Number(request.params.id);

    await this.itemService.deleteItem(request.session, id);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}