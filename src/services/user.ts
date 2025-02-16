import { UserStatus, UserType } from "../models/types";
import { Session } from "../models/interfaces";
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

  public getUser = async (session: Session): Promise<UserType> => {
    if (!session.user.id) {
      throw new BadRequest(Errors.USER_NOT_FOUND);
    }

    const user = await this.userRepository.selectById(session.user.id);

    if (!user) {
      throw new BadRequest(Errors.USER_NOT_FOUND);
    }

    return user;
  }

  public updateUser = async (session: Session, userData: UserType): Promise<UserType | null> => {
    if (
      !validateEmail(userData.email) &&
      !userData.name &&
      !userData.password
    ) {
      throw new BadRequest(Errors.INVALID_PARAMS);
    }

    if (userData.password) {
      const hashPassword = bcrypt.hashSync(userData.password, 10);
      userData.password = hashPassword;
    }

    if (userData.email !== session.user.email) {
      userData.status = UserStatus.PENDING_VALIDATION;
    }

    return this.userRepository.updateUser(session.user.id as number, userData);
  }
}