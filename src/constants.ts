export class Constants {
  debbug: boolean;

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
    emailSender: string;
    emailSenderPassoword: string;
  }

  constructor(props: { [key: string]: string }) {
    this.debbug = props.DEBBUG === 'true',

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
      emailSender: props.EMAIL_SENDER,
      emailSenderPassoword: props.EMAIL_SENDER_PASSWORD,
    }
  }
}

let ConstantsEnv: Constants;

export const initializeEnvs = async (envs: any): Promise<void> => {
  ConstantsEnv = new Constants(envs);
}

export const getEnv = (): Constants => ConstantsEnv;