import { UserType } from "../../models/entitiesTypes";

export interface IUserRepository {
  create(user: UserType): Promise<UserType>;
  selectValidAccountByEmail(email: string, selectPassword?: boolean): Promise<UserType | null>;
  selectById(userId: number, selectPassword?: boolean): Promise<UserType | null>;
  updateUser(id: number, userInfo: Partial<UserType>, makeVericationCodeNull?: boolean): Promise<UserType | null>;
}