export class Constants {
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

  constructor(props: { [key: string]: string }) {
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
  }
}

let ConstantsEnv: Constants;

export const initializeEnvs = async (envs: any): Promise<void> => {
  ConstantsEnv = new Constants(envs);
}

export const getEnv = (): Constants => ConstantsEnv;