import { Router } from "express";
import { errorHandler } from "../utils/error";
import Dependencies from "../dependencies";
import { auth } from "../middlewares/auth";
import { validateUserStatus } from "../middlewares/validateUserStatus";

const router = Router();

const { itemsGroupController } = Dependencies.getInstance();

router.get('/all', auth, validateUserStatus, errorHandler(itemsGroupController.selectAll));
router.post('/create', auth, validateUserStatus, errorHandler(itemsGroupController.create));
router.put('/:id', auth, validateUserStatus, errorHandler(itemsGroupController.update));
router.delete('/:id', auth, validateUserStatus, errorHandler(itemsGroupController.delete));

export default router;