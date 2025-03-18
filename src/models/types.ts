type BaseEntityType = {
  id?: number;
  createdAt?: Date;
  deletedAt?: Date;
}

export type UserType = BaseEntityType & {
  email?: string;
  name?: string;
  password?: string;
  status?: UserStatus;
  verificationCode?: string | null;
  categories?: CategoryType[];
  itemsGroups?: ItemsGroupType[];
}

export enum UserStatus {
  PENDING_VALIDATION = 1,
  ACTIVE = 2,
  INATIVE = 3,
}

export type CategoryType = BaseEntityType & {
  name?: string;
  user?: UserType;
}

export type ItemType = BaseEntityType & {
  name?: string;
  isChecked?: boolean;
  itemsGroup?: ItemsGroupType;
}

export type ItemsGroupType = BaseEntityType & {
  name?: string;
  user?: UserType;
  items?: ItemType[];
}