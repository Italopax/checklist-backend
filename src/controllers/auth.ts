import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/auth";
import { IAuthController } from "./interfaces/auth";
import { LoginCredentials } from "../models";
import { HttpStatus } from "../utils/error";

export class AuthController implements IAuthController {
  private readonly authService: IAuthService;

  constructor(AuthService: IAuthService) {
    this.authService = AuthService;
  }

  public login = async (request: Request, response: Response): Promise<void> => {
    const userCredentials: LoginCredentials = {
      email: request.body.login,
      password: request.body.password,
    };

    const { accessTokenCookieValues, refreshTokenCookieValues } = await this.authService.generateLoginCookiesData(userCredentials);

    response.cookie(
      accessTokenCookieValues.name,
      accessTokenCookieValues.value,
      accessTokenCookieValues.options
    );

    response.cookie(
      refreshTokenCookieValues.name,
      refreshTokenCookieValues.value,
      refreshTokenCookieValues.options
    );

    response.status(HttpStatus.NO_CONTENT).send();
  }

  public refreshToken = async (request: Request, response: Response): Promise<void> => {
    const { refreshToken } = request.cookies;

    const accessTokenCookieValues = await this.authService.getNewAccesTokenData(refreshToken);

    response.cookie(
      accessTokenCookieValues.name,
      accessTokenCookieValues.value,
      accessTokenCookieValues.options
    );

    response.status(HttpStatus.NO_CONTENT).send();
  }
}