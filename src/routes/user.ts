import { Router } from "express";
import { routeHandler } from "../utils/error";
import Dependencies from "../dependencies";
import { auth } from "../middlewares/auth";

const router: Router = Router();

const { userController } = Dependencies.getInstance();

router.post("/create", routeHandler(userController.create));
router.put("/update", auth, routeHandler(userController.update));

export default router;