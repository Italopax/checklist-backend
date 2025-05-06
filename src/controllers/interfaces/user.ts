import { Request, Response } from "express";

export interface IUserController {
  create(request: Request, response: Response): Promise<void>;
  getMe(request: Request, response: Response): Promise<void>;
  verifyEmailToken(request: Request, response: Response): Promise<void>;
  update(request: Request, response: Response): Promise<void>;
  changePassword(request: Request, response: Response): Promise<void>;
  resendVerificationCode(request: Request, response: Response): Promise<void>;
}