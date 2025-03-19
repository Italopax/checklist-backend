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
export type UserUpdateInput = Partial<Pick<UserType, 'email' | 'name' | 'password' | 'status'>>;

// CATEGORY TYPES

export type CategoryType = BaseEntityType & {
  name?: string;
  user?: UserType;
}

// ITEM TYPES

export type ItemType = BaseEntityType & {
  name?: string;
  isChecked?: boolean;
  itemsGroup?: ItemsGroupType;
}

// ITEM GROUP TYPES

export type ItemsGroupType = BaseEntityType & {
  name?: string;
  user?: UserType;
  items?: ItemType[];
}