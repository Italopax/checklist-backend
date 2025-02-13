import { CookieObjectData, LoginCookiesData, LoginCredentials } from "../../models/interfaces";

export interface IAuthService {
  generateLoginCookiesData({ email, password }: LoginCredentials): Promise<LoginCookiesData>;
  getNewAccesTokenData(refreshToken: string): Promise<CookieObjectData>
}
