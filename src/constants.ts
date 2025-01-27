export class Constants {
  database: {
    host: string;
    port: number;
    username: string;
    database: string;
    password: string;
  }

  constructor(props: { [key: string]: string }) {
    this.database = {
      host: props.DATABASE_HOST,
      port: Number(props.DATABASE_PORT),
      username: props.DATABASE_USERNAME,
      database: props.DATABASE_NAME,
      password: props.DATABASE_PASSWORD,
    }
  }
}

let ConstantsEnv: Constants;

export const initializeEnvs = async (envs: any): Promise<void> => {
  ConstantsEnv = new Constants(envs);
}

export const getEnv = (): Constants => ConstantsEnv;