import { FindOneOptions } from "typeorm";
import { UserType } from "../../models";

export interface IUserRepository {
  create(user: UserType): Promise<UserType>;
  selectValidAccountByEmail(email: string): Promise<UserType | null>;
  selectOneByWhere(userParams: FindOneOptions<UserType>): Promise<UserType | null>;
  selectById(userId: number): Promise<UserType | null>;
}