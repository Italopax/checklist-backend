import { UserType } from "./types";

export interface Session {
  user: UserType;
};

export interface CookieObjectData {
  name: string;
  value: string;
  options: {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
  };
};

export interface LoginCookiesData {
  accessTokenCookieValues: CookieObjectData,
  refreshTokenCookieValues: CookieObjectData
}

export type LoginCredentials = {
  email: string;
  password: string;
}