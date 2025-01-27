import { UserType } from "../models";
import { IUserService } from "../services/interfaces/user";
import { HttpStatus } from "../utils/error";
import { IUserController } from "./interfaces/user";
import { Request, Response } from "express";

export class UserController implements IUserController{
  private userService: IUserService;

  constructor(UserService: IUserService) {
    this.userService = UserService;
  }
  
  public create = async (request: Request, response: Response): Promise<void> => {
    const user = await this.userService.createUser(request.body as UserType);
    response.status(HttpStatus.OK).send(user);
  }
}