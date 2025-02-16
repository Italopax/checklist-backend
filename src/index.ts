import "dotenv/config";
import express from "express";
import { initializeEnvs } from "./constants";
import { errorHandler } from "./utils/error";
import cookieParser from "cookie-parser";

(async () => {
  const app = express();
  const port = 3000;
  
  app.use(cookieParser());
  app.use(express.json());
  
  await initializeEnvs({ ...process.env });

  const { AppDataSource } = require("./database");
  const { router} = require("./routes");

  app.use(router);
  app.use(errorHandler);

  AppDataSource.initialize()
    .then(() => {
      console.log(`DATABASE INITIALIZED IN PORT ${port}`);
      app.listen(port, () => {
        console.log("API INITIALIZED");
      })
    })
    .catch((error: any) => {
      console.log("DATABASE INITIALIZATION ERROR", error)
    });
})().catch((error) => console.log(error));