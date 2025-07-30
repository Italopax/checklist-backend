import { UserCreateInput, UserUpdateInput } from "../models/entitiesTypes";
import { ChangePasswordDTO } from "../models/interfaces";
import { IUserService } from "../services/interfaces/user";
import { HttpStatus } from "../models/enums";
import { IUserController } from "./interfaces/user";
import { Request, Response } from "express";

export class UserController implements IUserController{
  private userService: IUserService;

  constructor(UserService: IUserService) {
    this.userService = UserService;
  }
  
  public create = async (request: Request, response: Response): Promise<void> => {
    const bodyInfos: UserCreateInput = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
    };

    const user = await this.userService.createUser(bodyInfos);
    response.status(HttpStatus.CREATED).send({
      data: user,
    });
  }

  public getMe = async (request: Request, response: Response): Promise<void> => {
    const user = await this.userService.getUser(request.session);
    response.status(HttpStatus.OK).send({
      data: user,
    });
  }

  public update = async (request: Request, response: Response): Promise<void> => {
    const bodyInfos: UserUpdateInput = {
      email: request.body.email,
      name: request.body.name,
    };

    const user = await this.userService.updateUser(request.session, bodyInfos);
    response.status(HttpStatus.OK).send({
      data: user,
    });
  }

  public changePassword = async (request: Request, response: Response): Promise<void> => {
    const userPasswords: ChangePasswordDTO = {
      actualPassword: request.body.actualPassword,
      newPassword: request.body.newPassword,
    };

    await this.userService.updateUserPassword(request.session, userPasswords);
    response.status(HttpStatus.NO_CONTENT).send();
  }

  public verifyEmailToken = async (request: Request, response: Response): Promise<void> => {
    const { verificationCode } = request.body;

    await this.userService.validateEmail(request.session, verificationCode);
    response.status(HttpStatus.NO_CONTENT).send();
  }
  
  public sendRecoveryPasswordVerificationCode = async (request: Request, response: Response): Promise<void> => {
    const { email } = request.body;

    await this.userService.sendRecoveryPasswordVerificationCode(email);
    response.status(HttpStatus.NO_CONTENT).send();
  }

  public recoveryPassowrd = async (request: Request, response: Response): Promise<void> => {
    const { email, verificationCode, newPassword } = request.body;

    await this.userService.recoveryPassword(email, verificationCode, newPassword);
    response.status(HttpStatus.NO_CONTENT).send();
  }

  public resendVerificationCode = async (request: Request, response: Response): Promise<void> => {
    await this.userService.resendVerificationCode(request.session);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}