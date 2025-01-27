import { IUserService } from "../services/interfaces/user";
import { IAuthController } from "./interfaces/auth";

export class AuthController implements IAuthController {
  private readonly userService: IUserService;

  constructor(UserService: IUserService) {
    this.userService = UserService;
  }
}