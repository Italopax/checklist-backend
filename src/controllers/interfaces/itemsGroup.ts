import { Request, Response } from "express";

export interface IItemsGroupController {
  create(request: Request, response: Response): Promise<void>;
  selectAll(request: Request, response: Response): Promise<void>;
  update(request: Request, response: Response): Promise<void>;
  delete(request: Request, response: Response): Promise<void>;
}
