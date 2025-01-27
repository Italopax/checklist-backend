import { FindOneOptions } from "typeorm";
import { UserType } from "../../models";

export interface IUserRepository {
  create(user: UserType): Promise<UserType>;
  selectOneByWhere(userParams: FindOneOptions<UserType>): Promise<UserType | null>;
}