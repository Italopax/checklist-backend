import { Router } from "express";
import { routeHandler } from "../utils/error";
import Dependencies from "../dependencies";

const router: Router = Router();

const { userController } = Dependencies.getInstance();

router.post("/create", routeHandler(userController.create));

export default router;