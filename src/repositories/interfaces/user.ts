import { UserType } from "../../models/entitiesTypes";
import { SensitiveColumns } from "../../models/types";

export interface IUserRepository {
  create(user: UserType): Promise<UserType>;
  selectValidUserByEmail(email: string, selectPassword?: boolean): Promise<UserType>;
  selectById(userId: number, removeSensitiveColumns?: SensitiveColumns): Promise<UserType>;
  update(id: number, userInfo: Partial<UserType>, makeVericationCodeNull?: boolean, makeRecoveryPasswordVericationCodeNull?: boolean): Promise<UserType>;
  existUserByFields(fields: Partial<UserType>): Promise<boolean>;
  selectByEmail(email: string, selectColumns?: Partial<Record<keyof UserType, boolean>>): Promise<UserType>;
}