import { Request, Response } from "express";
import { IItemsGroupService } from "../services/interfaces/itemsGroup";
import { IItemsGroupController } from "./interfaces/itemsGroup";
import { ItemsGroupCreateInput, ItemsGroupUpdateInput } from "../models/entitiesTypes";
import { HttpStatus } from "../utils/error";

export class ItemsGroupController implements IItemsGroupController {
  private readonly itemsGroupService: IItemsGroupService;

  constructor(ItemsGroupService: IItemsGroupService) {
    this.itemsGroupService = ItemsGroupService;
  }

  public create = async (request: Request, response: Response): Promise<void> => {
    const itemsGroupInfos: ItemsGroupCreateInput = {
      name: request.body.name,
      userId: request.session.user.id,
    }

    const itemsGroupCreated = await this.itemsGroupService.createItemsGroup(request.session, itemsGroupInfos);
    response.status(HttpStatus.CREATED).send({
      data: itemsGroupCreated,
    });
  }

  public selectAll = async (request: Request, response: Response): Promise<void> => {
    const itemsGroups = await this.itemsGroupService.selectAllItemsGroup(request.session);

    response.status(HttpStatus.OK).send({
      data: itemsGroups,
    });
  }

  public update = async (request: Request, response: Response): Promise<void> => {
    const id: number = Number(request.params.id);
    const itemsGroupNewInfos: ItemsGroupUpdateInput = {
      name: request.body.name,
    };

    const itemsGroupUpdated = await this.itemsGroupService.updateItemsGroup(request.session, id, itemsGroupNewInfos);

    response.status(HttpStatus.OK).send({
      data: itemsGroupUpdated,
    });
  }

  public delete = async (request: Request, response: Response): Promise<void> => {
    const id: number = Number(request.params.id);

    await this.itemsGroupService.deleteItemsGroup(request.session, id);

    response.status(HttpStatus.NO_CONTENT).send();
  }
}