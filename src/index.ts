import "dotenv/config";
import express from "express";
import { initializeEnvs } from "./constants";
import { errorManager } from "./utils/error";
import cookieParser from "cookie-parser";
import cors from "cors";

(async () => {
  const app = express();
  const port = 3030;
  
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
  
  await initializeEnvs({ ...process.env });

  const { AppDataSource } = require("./database");
  const { router} = require("./routes");

  app.use(router);
  app.use(errorManager);

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