import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import itemsGroupRoutes from "./itemsGroup";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/items-group", itemsGroupRoutes);

export { router };