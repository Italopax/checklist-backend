import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getEnv } from "../constants";
import { Errors, errorHandler, Unauthorized } from "../utils/error";
import { User } from "../database/entities";
import { AppDataSource } from "../database";

const ConstantEnvs = getEnv();

export const auth = errorHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { accessToken } = request.cookies;

  if (!accessToken) throw new Unauthorized(Errors.USER_UNAUTHORIZED);

  try {
    const payload = jwt.verify(accessToken, ConstantEnvs.jwt.secretKey) as jwt.JwtPayload;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: {
        id: Number(payload.userId),
      }
    });

    request.session = {
      user,
    };

    next();
  } catch (error) {
    throw new Unauthorized(Errors.USER_UNAUTHORIZED);
  }
});
