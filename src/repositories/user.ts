import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../database/entities";
import { IUserRepository } from "./interfaces/user";
import { UserType } from "../models";

export class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  public create = async (userInfo: UserType): Promise<UserType> => {
    const userCreated = await this.repository.save(userInfo);

    return userCreated;
  }

  public selectOneByWhere = async (userParams: FindOneOptions<UserType>): Promise<UserType | null> => {
    const userSelected = await this.repository.findOne(userParams);
    return userSelected;
  }
}