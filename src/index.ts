import "dotenv/config";
import express from "express";
import { initializeEnvs } from "./constants";
import { errorManager } from "./utils/error";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

(async () => {
  const app = express();
  const port = 3030;
  
  app.use(cookieParser());
  app.use(express.json());
  app.use(helmet());

  app.use(cors({
    origin: ["http://localhost:3000", "*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  }));
  
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