import { UserType } from "./entitiesTypes";
import { SameSiteCookieConfiguration } from "./types";

export interface Session {
  user: Required<UserType>;
};

export interface CookieObjectData {
  name: string;
  value: string;
  options: {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
    domain?: string;
    sameSite?: SameSiteCookieConfiguration;
  };
};

export interface LoginCookiesData {
  accessTokenCookieValues: CookieObjectData,
  refreshTokenCookieValues: CookieObjectData
}

export interface LoginAcessTokens {
  accessToken: string,
  refreshToken: string,
}

export type LoginCredentials = {
  email: string;
  password: string;
}

export interface ChangePasswordDTO {
  actualPassword: string;
  newPassword: string;
}