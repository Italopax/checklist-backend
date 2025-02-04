import { Request, Response } from "express";

export interface IAuthController {
  login(request: Request, response: Response): Promise<void>;
  refreshToken(request: Request, response: Response): Promise<void>;
}
