export class Constants {
  debbug: boolean;
  corsOriginsAllowed: string[] | string;

  database: {
    host: string;
    port: number;
    username: string;
    database: string;
    password: string;
  }

  jwt: {
    secretKey: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
  }

  email: {
    user: string;
    password: string;
    host: string;
    port: number;
    secure: boolean;
  }

  constructor(props: { [key: string]: string }) {
    this.debbug = props.DEBBUG === 'true',
    this.corsOriginsAllowed = props.CORS_ORIGINS_ALLOWED?.split(',') ?? "*",

    this.database = {
      host: props.DATABASE_HOST,
      port: Number(props.DATABASE_PORT),
      username: props.DATABASE_USERNAME,
      database: props.DATABASE_NAME,
      password: props.DATABASE_PASSWORD,
    }

    this.jwt = {
      secretKey: props.JWT_SECRET,
      accessTokenExpiration: Number(props.ACCESS_TOKEN_EXPIRATION),
      refreshTokenExpiration: Number(props.REFRESH_TOKEN_EXPIRATION),
    }

    this.email = {
      user: props.EMAIL_SENDER,
      password: props.EMAIL_SENDER_PASSWORD,
      host: props.EMAIL_SENDER_HOST,
      port: Number(props.EMAIL_SENDER_PORT),
      secure: Boolean(props.EMAIL_SENDER_SECURE),
    }
  }
}

let ConstantsEnv: Constants;

export const initializeEnvs = async (envs: any): Promise<void> => {
  ConstantsEnv = new Constants(envs);
}

export const getEnv = (): Constants => ConstantsEnv;