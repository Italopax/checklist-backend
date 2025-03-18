import { UserType, UserCreateInput, UserUpdateInput } from "../../models/entitiesTypes";
import { Session } from "../../models/interfaces";

export interface IUserService {
  createUser(userData: UserCreateInput): Promise<UserType>;
  getUser(session: Session): Promise<UserType>;
  updateUser(session: Session, userData: UserUpdateInput): Promise<UserType | null>;
  validateEmail(session: Session, verificationCode: string): Promise<void>;
  resendVerificationCode(session: Session): Promise<void>;
}