import { Router } from "express";
import { errorHandler } from "../utils/error";
import Dependencies from "../dependencies";
import { auth } from "../middlewares/auth";
import { validateUserStatus } from "../middlewares/validateUserStatus";

const router: Router = Router();

const { userController } = Dependencies.getInstance();

router.post("/create", errorHandler(userController.create));
router.post("/send-recovery-passoword-verification-code", errorHandler(userController.sendRecoveryPasswordVerificationCode));
router.post("/recovery-password", errorHandler(userController.recoveryPassowrd));
router.get("/me", auth, validateUserStatus, errorHandler(userController.getMe));
router.post("/verify-email", auth, validateUserStatus, errorHandler(userController.verifyEmailToken));
router.put("/update", auth, validateUserStatus, errorHandler(userController.update));
router.patch("/update-password", auth, validateUserStatus, errorHandler(userController.changePassword));
router.post("/resend-verification-code", auth, validateUserStatus, errorHandler(userController.resendVerificationCode));
router.post("/disable", auth, validateUserStatus, errorHandler(userController.disableUser));

export default router;