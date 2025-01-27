import { Repository } from "typeorm";
import { Item } from "../database/entities";
import { AppDataSource } from "../database";
import { IItemRepository } from "./interfaces/item";

export class ItemRepository implements IItemRepository {
  private readonly repository: Repository<Item>;

  constructor() {
    this.repository = AppDataSource.getRepository(Item);
  }
}