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
    const bodyInfos = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
    };

    const user = await this.userService.createUser(bodyInfos);
    response.status(HttpStatus.CREATED).send({
      data: user,
    });
  }
}