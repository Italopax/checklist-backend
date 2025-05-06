import { Router } from "express";
import { errorHandler } from "../utils/error";
import Dependencies from "../dependencies";
import { auth } from "../middlewares/auth";

const router: Router = Router();

const { userController } = Dependencies.getInstance();

router.post("/create", errorHandler(userController.create));
router.get("/me", auth, errorHandler(userController.getMe));
router.post("/verify-email", auth, errorHandler(userController.verifyEmailToken));
router.put("/update", auth, errorHandler(userController.update));
router.patch("/update-password", auth, errorHandler(userController.changePassword));
router.post("/resend-verification-code", auth, errorHandler(userController.resendVerificationCode));

export default router;