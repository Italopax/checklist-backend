import { Request, Response } from "express";

export interface IAuthController {
  loginWithCookies(request: Request, response: Response): Promise<void>;
  refreshTokenWithCookies(request: Request, response: Response): Promise<void>;
  login(request: Request, response: Response): Promise<void>;
  refreshToken(request: Request, response: Response): Promise<void>;
  logout(request: Request, response: Response): Promise<void>;
}
