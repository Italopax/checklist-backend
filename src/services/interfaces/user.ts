import { UserType, UserCreateInput, UserUpdateInput } from "../../models/entitiesTypes";
import { ChangePasswordDTO, Session } from "../../models/interfaces";

export interface IUserService {
  createUser(userData: UserCreateInput): Promise<UserType>;
  getUser(session: Session): Promise<UserType>;
  updateUser(session: Session, userData: UserUpdateInput): Promise<UserType>;
  updateUserPassword(session: Session, passwords: ChangePasswordDTO): Promise<void>;
  validateEmail(session: Session, verificationCode: string): Promise<void>;
  resendVerificationCode(session: Session): Promise<void>;
  sendRecoveryPasswordVerificationCode(email: string): Promise<void>;
  recoveryPassword(email: string, verificationCode: string, newPassword: string): Promise<void>;
  disable(session: Session): Promise<void>;
}