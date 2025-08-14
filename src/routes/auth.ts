import { Router } from "express";
import Dependencies from "../dependencies";
import { errorHandler } from "../utils/error";

const router = Router();

const { authController } = Dependencies.getInstance();

router.post("/login", errorHandler(authController.loginWithCookies));
router.post("/refreshToken", errorHandler(authController.refreshTokenWithCookies));
router.post("/v2/login", errorHandler(authController.login));
router.post("/v2/refreshToken", errorHandler(authController.refreshToken));
router.post("/logout", errorHandler(authController.logout));

export default router;