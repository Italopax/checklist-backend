import { IsNull, Repository } from "typeorm";
import { ItemsGroup } from "../database/entities";
import { AppDataSource } from "../database";
import { IItemsGroupRepository } from "./interfaces/itemsGroup";
import { ItemsGroupType } from "../models/entitiesTypes";

export class ItemsGroupRepository implements IItemsGroupRepository {
  private readonly repository: Repository<ItemsGroup>;

  constructor() {
    this.repository = AppDataSource.getRepository(ItemsGroup);
  }

  public create = async (itemsGroupInfos: ItemsGroupType): Promise<ItemsGroupType> => {
    return this.repository.save(itemsGroupInfos)
  };

  public update = async (id: number, itemsGroupInfos: Partial<ItemsGroupType>): Promise<ItemsGroupType> => {
    const { name, deletedAt } = itemsGroupInfos;
    await this.repository.update(id, {
      ...(name && { name }),
      ...(deletedAt && { deletedAt }),
    });

    return this.selectById(id);
  };

  public selectById = async (id: number): Promise<ItemsGroupType> => {
    return this.repository.findOne({
      where: {
        id,
      }
    });
  };

  public selectByName = async (userId: number, name: string): Promise<ItemsGroupType> => {
    return this.repository.findOne({
      where: {
        name,
        deletedAt: IsNull(),
        userId,
      }
    });
  }

  public selectAllFromUserId = async(userId: number): Promise<ItemsGroup[]> => {
    return this.repository.find({
      where: {
        userId,
      }
    });
  }
}