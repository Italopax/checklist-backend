import { SameSiteCookieConfiguration } from "./models/types";

export class Constants {
  debbug: boolean;
  corsOriginsAllowed: string;

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
    domain?: string;
    sameSite?: SameSiteCookieConfiguration;
  }

  email: {
    user: string;
    password: string;
    host: string;
    port: number;
    secure: boolean;
  }

  cookies: {
    domain: string;
    path: string;
  }

  constructor(props: { [key: string]: string }) {
    this.debbug = props.DEBBUG === 'true',
    this.corsOriginsAllowed = props.CORS_ORIGINS_ALLOWED,

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
      domain: props.TOKEN_DOMAIN,
      sameSite: props.TOKEN_SAME_SITE as SameSiteCookieConfiguration,
    }

    this.email = {
      user: props.EMAIL_SENDER,
      password: props.EMAIL_SENDER_PASSWORD,
      host: props.EMAIL_SENDER_HOST,
      port: Number(props.EMAIL_SENDER_PORT),
      secure: Boolean(props.EMAIL_SENDER_SECURE),
    }

    this.cookies = {
      domain: props.COOKIES_DOMAIN,
      path: props.COOKIES_PATH || '/',
    }
  }
}

let ConstantsEnv: Constants;

export const initializeEnvs = async (envs: any): Promise<void> => {
  ConstantsEnv = new Constants(envs);
}

export const getEnv = (): Constants => ConstantsEnv;