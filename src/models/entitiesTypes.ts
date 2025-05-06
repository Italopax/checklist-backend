import { UserStatus } from "./enums";

type BaseEntityType = {
  id?: number;
  createdAt?: Date;
  deletedAt?: Date;
}

// USER TYPES

export type UserType = BaseEntityType & {
  email: string;
  name: string;
  password?: string;
  status: UserStatus;
  verificationCode?: string | null;
  categories?: CategoryType[];
  itemsGroups?: ItemsGroupType[];
}

export type UserCreateInput = Required<Pick<UserType, 'email' | 'name' | 'password'>>;
export type UserUpdateInput = Partial<Pick<UserType, 'email' | 'name' | 'password' | 'status' | 'verificationCode'>>;

// ITEM GROUP TYPES

export type ItemsGroupType = BaseEntityType & {
  name: string;
  userId: number;
  items?: ItemType[];
  user?: UserType;
}

export type ItemsGroupCreateInput = Required<Pick<ItemsGroupType, 'name' | 'userId'>>;
export type ItemsGroupUpdateInput = Pick<ItemsGroupType, 'name'>;

// ITEM TYPES

export type ItemType = BaseEntityType & {
  name: string;
  isChecked: boolean;
  itemsGroupId: number;
  itemsGroup?: ItemsGroupType;
}

export type ItemCreateInput = Required<Pick<ItemType, 'name' | 'itemsGroupId'>>;
export type ItemUpdateInput = Pick<ItemType, 'name'>;

// CATEGORY TYPES

export type CategoryType = BaseEntityType & {
  name?: string;
  user?: UserType;
}
