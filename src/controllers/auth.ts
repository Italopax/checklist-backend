import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/auth";
import { IAuthController } from "./interfaces/auth";
import { LoginCredentials } from "../models/interfaces";
import { HttpStatus } from "../utils/error";

export class AuthController implements IAuthController {
  private readonly authService: IAuthService;

  constructor(AuthService: IAuthService) {
    this.authService = AuthService;
  }

  public loginWithCookies = async (request: Request, response: Response): Promise<void> => {
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

  public refreshTokenWithCookies = async (request: Request, response: Response): Promise<void> => {
    const { refreshToken } = request.cookies;
    
    const accessTokenCookieValues = await this.authService.getNewAccesTokenData(refreshToken);

    response.cookie(
      accessTokenCookieValues.name,
      accessTokenCookieValues.value,
      accessTokenCookieValues.options
    );

    response.status(HttpStatus.NO_CONTENT).send();
  }

  public login = async (request: Request, response: Response): Promise<void> => {
    const userCredentials: LoginCredentials = {
      email: request.body.login,
      password: request.body.password,
    };

    const data = await this.authService.getAccessTokens(userCredentials);

    response.status(HttpStatus.OK).send({
      data,
    });
  }

  public refreshToken = async (request: Request, response: Response): Promise<void> => {
    const { refreshToken } = request.cookies;
    
    const { accessToken } = await this.authService.refreshAccessToken(refreshToken);

    response.status(HttpStatus.OK).send({
      data: {
        accessToken,
      }
    });
  }
}