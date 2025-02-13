import { FindOneOptions, In, Repository } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../database/entities";
import { IUserRepository } from "./interfaces/user";
import { UserStatus, UserType } from "../models/types";

export class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  public create = async(userInfo: UserType): Promise<UserType> => {
    const { id, name, email, status } = await this.repository.save(userInfo);
    return {
      id,
      name,
      email,
      status
    };
  }

  public selectValidAccountByEmail = async(email: string): Promise<UserType | null> => {
    if (!email) return null;

    return this.repository.findOne({
      where: {
        email,
        status: In([UserStatus.ACTIVE, UserStatus.PENDING_VALIDATION]),
      }
    });
  }

  public selectOneByWhere = async(userParams: FindOneOptions<UserType>): Promise<UserType | null> => {
    const userSelected = await this.repository.findOne(userParams);
    return userSelected;
  }

  public selectById = async(userId: number): Promise<UserType | null> => {
    if (!userId) return null;

    return this.repository.findOne({
      where: {
        id: userId,
      }
    });
  }

  public updateUser = async(id: number, userInfo: UserType): Promise<UserType | null> => {
    if (!id) return null; 

    await this.repository.update(
      {
        id,
      },
      {
        ...(userInfo.name && { name: userInfo.name }),
        ...(userInfo.password && { password: userInfo.password }),
        ...(userInfo.email && { email: userInfo.email }),
      }
    );

    return this.selectById(id);
  }
}