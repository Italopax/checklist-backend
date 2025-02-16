import { UserType } from "../../models/types";
import { Session } from "../../models/interfaces";

export interface IUserService {
  createUser(userData: UserType): Promise<UserType>;
  getUser(session: Session): Promise<UserType>;
  updateUser(session: Session, userData: UserType): Promise<UserType | null>;
}