import { UserType } from "../../models";

export interface IUserService {
  createUser(userData: UserType): Promise<UserType>;
}