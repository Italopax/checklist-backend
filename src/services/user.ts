import { UserType } from "../models";
import { IUserRepository } from "../repositories/interfaces/user";
import { IUserService } from "./interfaces/user";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public createUser = async (userData: UserType): Promise<UserType> => {
    const createdUser = await this.userRepository.create(userData);
    return createdUser;
  }
}