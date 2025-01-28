type BaseEntityTpe = {
  id?: number;
  createdAt?: Date;
  deletedAt?: Date;
}

export type UserType = BaseEntityTpe & {
  email?: string;
  name?: string;
  password?: string;
  status?: number;
  categories?: CategoryType[];
  itemsGroups?: ItemsGroupType[];
}

export type CategoryType = BaseEntityTpe & {
  name?: string;
  user?: UserType;
}

export type ItemType = BaseEntityTpe & {
  name?: string;
  isChecked?: boolean;
  itemsGroup?: ItemsGroupType;
}

export type ItemsGroupType = BaseEntityTpe & {
  name?: string;
  user?: UserType;
  items?: ItemType[];
}

export type Session = {
  userId: string;
};