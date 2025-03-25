import { Request, Response } from "express";

export interface IItemController {
  selectAllFromItemsGroup(request: Request, response: Response): Promise<void>;
  update(request: Request, response: Response): Promise<void>;
  delete(request: Request, response: Response): Promise<void>;
  create(request: Request, response: Response): Promise<void>;
}
