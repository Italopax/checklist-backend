import { Handler, Response, Request, NextFunction } from "express";
import { getEnv } from "../constants";
import { HttpStatus } from "../models/enums";

enum ErrorsName {
  BAD_REQUEST = "BadRequest",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  INTERNAL_SERVER_ERROR = "InternalServerError",
}

export enum Errors {
  USER_UNAUTHORIZED = "Usuário não autorizado",
  USER_ALREADY_CREATED = "Usuário já existente.",
  USER_NOT_FOUND = "Usuário não encontrado.",
  USER_OR_PASSWORD_INVALID = "Usuário ou senha incorretos.",
  INVALID_PASSWORD = "Senha incorreta.",
  USER_CANT_VALIDATE_EMAIL_ON_THIS_STATUS = "Usuário não pode validar seu email estando neste estatus.",
  INCORRECT_CODE = "Código incorreto.",
  INVALID_DATA_FORMAT = "Formato incorreto das informações.",
  INVALID_PARAMS = "Parâmetros inválidos.",
  INTERNAL_SERVER_ERROR = "Ocorreu um erro desconhecido.",
  EMAIL_SENDING_ERROR = "Erro ao enviar email.",
  CANT_SEND_VERIFICATION_CODE_ON_THIS_STATUS = "Não é possível reenviar o código de verificação neste estatus.",
  EMAIL_IN_USE = "Email já utilizado",
  ITEMS_GROUP_WITH_THIS_NAME_ALREADY_EXIST = "Nome de grupo de itens já utilizado.",
  ITEMS_GROUP_NOT_FOUND = "Grupo de itens não encontrado.",
  ITEM_WITH_THIS_NAME_ALREADY_CREATED = "Item com mesmo nome já criado.",
  ITEM_NOT_FOUND = "Item não encontrado",
}

export class BadRequest extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorsName.BAD_REQUEST;
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

export class Unauthorized extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorsName.UNAUTHORIZED;
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}

export class Forbidden extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorsName.FORBIDDEN;
    this.statusCode = HttpStatus.FORBIDDEN;
  }
}

export class InternalServerError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorsName.INTERNAL_SERVER_ERROR;
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export const errorHandler = (handlerFunction: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handlerFunction(req, res, next)).catch((error) =>
      next(error),
    );
  };
};

// export const tryCatch = (controller: any) => async (request: Request, response: Response, next: NextFunction) => {
//   try {
//     await controller(request, response);
//   } catch (error) {
//     next(error);
//   }
// };
  
// manipulação dependendo do tipo de erro
export const errorManager = (
  error: BadRequest | Unauthorized | Forbidden | InternalServerError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  switch (true) {
    case error instanceof BadRequest:
    case error instanceof Unauthorized:
    case error instanceof Forbidden:
      res.status(error.statusCode).send({
        errorMessage: error.message,
        status: error.statusCode,
        type: error.name,
      });
      break;

    default:
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errorMessage: Errors.INTERNAL_SERVER_ERROR,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        type: Errors.INTERNAL_SERVER_ERROR,
        ...(getEnv().debbug && { stack: error.stack })
      });
  }
};