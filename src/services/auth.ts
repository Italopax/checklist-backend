import jwt from "jsonwebtoken";
import { CookieObjectData, LoginAcessTokens, LoginCookiesData, LoginCredentials } from "../models/interfaces";
import { CookieNames } from "../models/enums";
import { IUserRepository } from "../repositories/interfaces/user";
import { BadRequest, Errors, Unauthorized } from "../utils/error";
import { IAuthService } from "./interfaces/auth";
import bcrypt from "bcrypt";
import { Response } from "express";
import { getEnv } from "../constants";

const ConstantEnvs = getEnv();

export class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  private generateToken = (payload: { [key: string]: any }, expirationTime: number): string => {
    const token = jwt.sign(
      payload,
      ConstantEnvs.jwt.secretKey,
      { expiresIn: expirationTime },
    );

    return token;
  }

  private getCookieData = (name: string, tokenValue: string, maxAge: number): CookieObjectData => {
    return {
      name,
      value: tokenValue,
      options: {
        httpOnly: true,
        secure: true,
        maxAge,
      },
    }
  }

  private decodeToken = (token: string): { userId: number } => {
    try {
      const decodedInfos = jwt.verify(token, ConstantEnvs.jwt.secretKey);
      return decodedInfos as { userId: number };
    } catch (error) {
      throw new BadRequest(Errors.INVALID_PARAMS);
    }
  }

  public generateLoginCookiesData = async ({ email, password }: LoginCredentials): Promise<LoginCookiesData> => {
    if (!email || !password) throw new BadRequest(Errors.INVALID_PARAMS);

    const userExist = await this.userRepository.selectValidUserByEmail(email, true);
    if (!userExist) throw new BadRequest(Errors.USER_OR_PASSWORD_INVALID);

    const passwordIsCorrect = await bcrypt.compare(password, userExist.password as string);
    if (!passwordIsCorrect) throw new Unauthorized(Errors.USER_OR_PASSWORD_INVALID);

    const accessToken = this.generateToken({ userId: userExist.id }, ConstantEnvs.jwt.accessTokenExpiration);
    const refreshToken = this.generateToken({ userId: userExist.id }, ConstantEnvs.jwt.refreshTokenExpiration);

    const accessTokenCookieValues = this.getCookieData(CookieNames.ACCESS_TOKEN, accessToken, ConstantEnvs.jwt.accessTokenExpiration);
    const refreshTokenCookieValues = this.getCookieData(CookieNames.REFRESH_TOKEN, refreshToken, ConstantEnvs.jwt.refreshTokenExpiration);

    return {
      accessTokenCookieValues,
      refreshTokenCookieValues
    }
  }

  public getNewAccesTokenData = async (refreshToken: string): Promise<CookieObjectData> => {
    if (!refreshToken) throw new BadRequest(Errors.INTERNAL_SERVER_ERROR);

    const tokenPayload = this.decodeToken(refreshToken);
    const user = await this.userRepository.selectById(tokenPayload.userId);
    if (!user) throw new BadRequest(Errors.USER_NOT_FOUND);

    const accessToken = this.generateToken({ userId: user.id }, ConstantEnvs.jwt.accessTokenExpiration);
    const accessTokenCookieValues = this.getCookieData(CookieNames.ACCESS_TOKEN, accessToken, ConstantEnvs.jwt.accessTokenExpiration);

    return accessTokenCookieValues;
  }

  public getAccessTokens = async ({ email, password }: LoginCredentials): Promise<LoginAcessTokens> => {
    if (!email || !password) throw new BadRequest(Errors.INVALID_PARAMS);

    const userExist = await this.userRepository.selectValidUserByEmail(email, true);
    if (!userExist) throw new BadRequest(Errors.USER_OR_PASSWORD_INVALID);

    const passwordIsCorrect = await bcrypt.compare(password, userExist.password as string);
    if (!passwordIsCorrect) throw new Unauthorized(Errors.USER_OR_PASSWORD_INVALID);

    const accessToken = this.generateToken({ userId: userExist.id }, ConstantEnvs.jwt.accessTokenExpiration);
    const refreshToken = this.generateToken({ userId: userExist.id }, ConstantEnvs.jwt.refreshTokenExpiration);

    return {
      accessToken,
      refreshToken
    }
  }

  public refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string}> => {
    if (!refreshToken) throw new BadRequest(Errors.INTERNAL_SERVER_ERROR);

    const tokenPayload = this.decodeToken(refreshToken);
    const user = await this.userRepository.selectById(tokenPayload.userId);
    if (!user) throw new BadRequest(Errors.USER_NOT_FOUND);

    const accessToken = this.generateToken({ userId: user.id }, ConstantEnvs.jwt.accessTokenExpiration);

    return {
      accessToken,
    };
  }

  public logout = async (response: Response, cookies: string[]): Promise<void> => {
    cookies.forEach((cookie) => {
      response.clearCookie(cookie);
    });
  }
}