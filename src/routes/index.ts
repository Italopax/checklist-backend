import { Router, Request, Response } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import itemsGroupRoutes from "./itemsGroup";
import itemRoutes from "./item";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/items-group", itemsGroupRoutes);
router.use("/item", itemRoutes);

router.get("/", (request: Request, response: Response): void => {
  response.send("Hello world!");
});

export { router };