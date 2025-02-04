import { UserStatus, UserType } from "../models";
import { IUserRepository } from "../repositories/interfaces/user";
import { validateEmail } from "../utils";
import { BadRequest, Errors } from "../utils/error";
import { IUserService } from "./interfaces/user";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public createUser = async (userData: UserType): Promise<UserType> => {
    if (
      !validateEmail(userData.email) ||
      !userData.name ||
      !userData.password
    ) {
      throw new BadRequest(Errors.INVALID_PARAMS);
    }

    const userExist = await this.userRepository.selectValidAccountByEmail(userData.email as string);
    if (userExist) {
      throw new BadRequest(Errors.USER_ALREADY_CREATED);
    }

    const hashPassword = bcrypt.hashSync(userData.password, 10);
    const userDataToCreate = {
      ...userData,
      password: hashPassword,
      status: UserStatus.PENDING_VALIDATION,
    };

    const createdUser = await this.userRepository.create(userDataToCreate);
    return createdUser;
  }
}