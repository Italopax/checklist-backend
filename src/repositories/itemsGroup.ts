import { Repository } from "typeorm";
import { ItemsGroup } from "../database/entities";
import { AppDataSource } from "../database";
import { IItemsGroupRepository } from "./interfaces/itemsGroup";

export class ItemsGroupRepository implements IItemsGroupRepository {
  private readonly repository: Repository<ItemsGroup>;

  constructor() {
    this.repository = AppDataSource.getRepository(ItemsGroup);
  }
}