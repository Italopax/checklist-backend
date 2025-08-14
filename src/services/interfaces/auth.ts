import { Response } from "express";
import { CookieObjectData, LoginAcessTokens, LoginCookiesData, LoginCredentials } from "../../models/interfaces";

export interface IAuthService {
  generateLoginCookiesData({ email, password }: LoginCredentials): Promise<LoginCookiesData>;
  getNewAccesTokenData(refreshToken: string): Promise<CookieObjectData>
  getAccessTokens({ email, password }: LoginCredentials): Promise<LoginAcessTokens>;
  refreshAccessToken(refreshToken: string): Promise<{ accessToken: string}>;
  logout(cookiesFunction: Response, cookies: string[]): Promise<void>;
}
