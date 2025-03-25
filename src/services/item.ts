import { Session } from "../models/interfaces";
import { ItemCreateInput, ItemType, ItemUpdateInput } from "../models/entitiesTypes";
import { IItemRepository } from "../repositories/interfaces/item";
import { IItemService } from "./interfaces/item";
import { BadRequest, Errors } from "../utils/error";
import { IItemsGroupRepository } from "../repositories/interfaces/itemsGroup";

export class ItemService implements IItemService {
  private readonly itemRepository: IItemRepository;
  private readonly itemsGroupRepository: IItemsGroupRepository;

  constructor(ItemRepository: IItemRepository, ItemsGroupRepository: IItemsGroupRepository) {
    this.itemRepository = ItemRepository;
    this.itemsGroupRepository = ItemsGroupRepository;
  }

  public createItem = async (session: Session, itemInfos: ItemCreateInput): Promise<ItemType> => {
    const { name, itemsGroupId } = itemInfos;

    if (!name || !itemsGroupId) throw new BadRequest(Errors.INVALID_PARAMS);

    const [itemsGroup, itemWithSameNameAlreadyExist] = await Promise.all(
      [this.itemsGroupRepository.selectById(itemInfos.itemsGroupId), this.itemRepository.selectByName(itemsGroupId, name)]
    );

    if (!itemsGroup || itemsGroup.userId !== session.user.id) throw new BadRequest(Errors.ITEMS_GROUP_NOT_FOUND);
    if (itemWithSameNameAlreadyExist) throw new BadRequest(Errors.ITEM_WITH_THIS_NAME_ALREADY_CREATED);
    
    return this.itemRepository.create({
      name,
      itemsGroupId,
    });
  }

  public selectItems = async (session: Session, itemsGroupId: number): Promise<ItemType[]> => {
    if (!itemsGroupId) throw new BadRequest(Errors.INVALID_PARAMS);

    const itemsGroup = await this.itemsGroupRepository.selectById(itemsGroupId);
    if (!itemsGroup || itemsGroup.userId !== session.user.id) throw new BadRequest(Errors.ITEMS_GROUP_NOT_FOUND);

    return this.itemRepository.selectByItemsGroupId(itemsGroupId);
  }

  public updateItem = async (session: Session, itemId: number, itemInfos: ItemUpdateInput): Promise<ItemType> => {
    if (!itemInfos.name || !itemId) throw new BadRequest(Errors.INVALID_PARAMS);

    const itemToUpdate = await this.itemRepository.selectByIdWithItemsGroupAndUser(itemId);
    if (!itemToUpdate || itemToUpdate.itemsGroup.user.id !== session.user.id) throw new BadRequest(Errors.ITEM_NOT_FOUND);

    const itemWhithThisNameAlreadyExist = await this.itemRepository.selectByName(itemToUpdate.itemsGroupId, itemInfos.name);
    if (itemWhithThisNameAlreadyExist) throw new BadRequest(Errors.ITEM_WITH_THIS_NAME_ALREADY_CREATED);

    return this.itemRepository.update(itemToUpdate.id, { name: itemInfos.name});
  }

  public deleteItem = async (session: Session, itemId: number): Promise<void> => {
    if (!itemId) throw new BadRequest(Errors.INVALID_PARAMS);
    
    const itemToDelete = await this.itemRepository.selectById(itemId);
    if (!itemToDelete) throw new BadRequest(Errors.ITEM_NOT_FOUND);
  
    await this.itemRepository.delete(itemToDelete.id);
  }
}