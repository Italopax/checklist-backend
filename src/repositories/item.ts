import { Repository } from "typeorm";
import { Item } from "../database/entities";
import { AppDataSource } from "../database";
import { IItemRepository } from "./interfaces/item";
import { ItemCreateInput, ItemUpdateInput, ItemType } from "../models/entitiesTypes";

export class ItemRepository implements IItemRepository {
  private readonly repository: Repository<Item>;

  constructor() {
    this.repository = AppDataSource.getRepository(Item);
  }

  public create = async (itemInfos: ItemCreateInput): Promise<ItemType> => {
    return this.repository.save(itemInfos);
  }

  public selectById = async (id: number): Promise<ItemType> => {
    return this.repository.findOne({
      where: {
        id,
      }
    });
  }

  public selectByIdWithItemsGroupAndUser = async (id: number): Promise<ItemType> => {
    const queryBuilder = this.repository.createQueryBuilder("item");
    const itemWithItemsGrouAndUser = await queryBuilder
      .leftJoinAndSelect("item.itemsGroup", "itemsGroup")
      .leftJoinAndSelect("itemsGroup.user", "user")
      .where("item.id = :id", { id })
      .getOne();

    return itemWithItemsGrouAndUser;
  }

  public selectByName = async (itemsGroupId: number, name: string): Promise<ItemType> => {
    return this.repository.findOne({
      where: {
        name,
        itemsGroupId,
      }
    });
  }

  public selectByItemsGroupId = async (itemsGroupId: number): Promise<ItemType[]> => {
    return this.repository.find({
      where: {
        itemsGroupId,
      }
    });
  }

  public update = async (id: number, itemInfos: ItemUpdateInput): Promise<ItemType> => {
    await this.repository.update(
      { id },
      {
        ...(itemInfos.name && { name: itemInfos.name }),
        ...((itemInfos.isChecked || itemInfos.isChecked === false) && { isChecked: itemInfos.isChecked }),
      }
    );

    return this.selectById(id);
  }

  public delete = async (id: number): Promise<void> => {
    await this.repository.softDelete({ id });
  }
}