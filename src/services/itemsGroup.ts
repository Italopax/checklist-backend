import { ItemsGroupCreateInput, ItemsGroupType, ItemsGroupUpdateInput } from "../models/entitiesTypes";
import { Session } from "../models/interfaces";
import { IItemRepository } from "../repositories/interfaces/item";
import { IItemsGroupRepository } from "../repositories/interfaces/itemsGroup";
import { BadRequest, Errors } from "../utils/error";
import { IItemsGroupService } from "./interfaces/itemsGroup";

export class ItemsGroupService implements IItemsGroupService {
  private readonly itemsGroupRepository: IItemsGroupRepository;
  private readonly itemRepository: IItemRepository;

  constructor(ItemsGroupRepository: IItemsGroupRepository, ItemsRepository: IItemRepository) {
    this.itemsGroupRepository = ItemsGroupRepository;
    this.itemRepository = ItemsRepository;
  }

  public createItemsGroup = async (session: Session, itemsGroupInfos: ItemsGroupCreateInput): Promise<ItemsGroupType> => {
    if (!itemsGroupInfos.name) throw new BadRequest(Errors.INVALID_PARAMS);

    const itemsGroupAlreadyExist = await this.itemsGroupRepository.selectByName(session.user.id, itemsGroupInfos.name);
    if (itemsGroupAlreadyExist) throw new BadRequest(Errors.ITEMS_GROUP_WITH_THIS_NAME_ALREADY_EXIST); 

    const itemsGroupCreated = await this.itemsGroupRepository.create(itemsGroupInfos);

    return itemsGroupCreated;
  }

  public selectAllItemsGroup = async (session: Session): Promise<ItemsGroupType[]> => {
    return this.itemsGroupRepository.selectAllFromUserId(session.user.id);
  }

  public updateItemsGroup = async (session: Session, itemsGroupId: number, itemsGroupInfos: ItemsGroupUpdateInput): Promise<ItemsGroupType> => {
    if (!itemsGroupInfos.name || !itemsGroupId) throw new BadRequest(Errors.INVALID_PARAMS);

    const thisItemsGroup = await this.itemsGroupRepository.selectById(itemsGroupId);

    if (!thisItemsGroup || thisItemsGroup.userId !== session.user.id) {
      throw new BadRequest(Errors.ITEMS_GROUP_NOT_FOUND);
    }

    const itemsGroupWithThisNameAlreadyExist = await this.itemsGroupRepository.selectByName(session.user.id, itemsGroupInfos.name);
    if (itemsGroupWithThisNameAlreadyExist) throw new BadRequest(Errors.ITEMS_GROUP_WITH_THIS_NAME_ALREADY_EXIST); 

    const itemsGroupUpdated = await this.itemsGroupRepository.update(thisItemsGroup.id, {
      name: itemsGroupInfos.name,
    });

    return itemsGroupUpdated;
  }

  public deleteItemsGroup = async (session: Session, itemsGroupId: number): Promise<void> => {
    const thisItemsGroup = await this.itemsGroupRepository.selectById(itemsGroupId);

    if (!thisItemsGroup || thisItemsGroup.userId !== session.user.id) {
      throw new BadRequest(Errors.ITEMS_GROUP_NOT_FOUND);
    }

    await Promise.all([
      this.itemsGroupRepository.update(itemsGroupId, {deletedAt: new Date()}),
      this.itemRepository.deleteAllByItemGroupId(itemsGroupId),
    ]);
  }
}