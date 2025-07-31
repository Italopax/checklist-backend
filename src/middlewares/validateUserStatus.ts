import { Request, Response, NextFunction } from "express";
import { Errors, errorHandler, Forbidden } from "../utils/error";
import { UserStatus } from "../models/enums";

export const validateUserStatus = errorHandler(async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userStatus = request.session.user.status;
    if (userStatus === UserStatus.INATIVE) {
      throw new Error();
    }

    next();
  } catch (error) {
    throw new Forbidden(Errors.INVALID_USER_STATUS);
  }
});