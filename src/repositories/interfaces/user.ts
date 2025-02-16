import { FindOneOptions } from "typeorm";
import { UserType } from "../../models/types";

export interface IUserRepository {
  create(user: UserType): Promise<UserType>;
  selectValidAccountByEmail(email: string, selectPassword?: boolean): Promise<UserType | null>;
  selectOneByWhere(userParams: FindOneOptions<UserType>): Promise<UserType | null>;
  selectById(userId: number, selectPassword?: boolean): Promise<UserType | null>;
  updateUser(id: number, userInfo: UserType): Promise<UserType | null>;
}