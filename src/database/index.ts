import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category, Item, ItemsGroup, User } from "./entities";
import { getEnv } from "../constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: getEnv().database.host,
  port: Number(getEnv().database.port),
  username: getEnv().database.username,
  database: getEnv().database.database,
  password: getEnv().database.password,
  entities: [
    User,
    Category,
    ItemsGroup,
    Item
  ],
  synchronize: true,
  logging: false,
});
