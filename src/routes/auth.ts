import { Router } from "express";
import Dependencies from "../dependencies";
import { routeHandler } from "../utils/error";

const router = Router();

const { authController } = Dependencies.getInstance();

router.post("/login", routeHandler(authController.login));
router.post("/refreshToken", routeHandler(authController.refreshToken));

export default router;