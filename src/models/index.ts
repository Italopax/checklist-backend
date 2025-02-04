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

export enum UserStatus {
  PENDING_VALIDATION = 1,
  ACTIVE = 2,
  INATIVE = 3,
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

export type LoginCredentials = {
  email: string;
  password: string;
}

export type CookieObjectData = {
  name: string;
  value: string;
  options: {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
  };
};

export enum CookieNames {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export type LoginCookiesData = {
  accessTokenCookieValues: CookieObjectData,
  refreshTokenCookieValues: CookieObjectData
}