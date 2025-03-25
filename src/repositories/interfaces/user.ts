import { UserType } from "../../models/entitiesTypes";
import { SensitiveColumns } from "../../models/types";

export interface IUserRepository {
  create(user: UserType): Promise<UserType>;
  selectValidAccountByEmail(email: string, selectPassword?: boolean): Promise<UserType>;
  selectById(userId: number, removeSensitiveColumns?: SensitiveColumns): Promise<UserType>;
  update(id: number, userInfo: Partial<UserType>, makeVericationCodeNull?: boolean): Promise<UserType>;
}