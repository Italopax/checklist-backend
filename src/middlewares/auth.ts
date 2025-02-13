import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getEnv } from "../constants";
import { Errors, Unauthorized } from "../utils/error";
import { User } from "../database/entities";
import { AppDataSource } from "../database";

const ConstantEnvs = getEnv();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) throw new Unauthorized(Errors.INVALID_PARAMS);

  try {
    const payload = jwt.verify(accessToken, ConstantEnvs.jwt.secretKey) as jwt.JwtPayload;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: {
        id: Number(payload.userId),
      }
    });

    req.session = {
      user,
    };

    next();
  } catch (error) {
    console.log(error);
    throw new Unauthorized(Errors.INVALID_PARAMS);
  }
};
