import { Request, Response } from "express";

export interface IUserController {
  create(request: Request, response: Response): Promise<void>;
  update(request: Request, response: Response): Promise<void>;
}