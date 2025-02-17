import { Router } from "express";
import Dependencies from "../dependencies";
import { errorHandler } from "../utils/error";

const router = Router();

const { authController } = Dependencies.getInstance();

router.post("/login", errorHandler(authController.login));
router.post("/refreshToken", errorHandler(authController.refreshToken));

export default router;