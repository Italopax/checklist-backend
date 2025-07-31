import { Router } from "express";
import Dependencies from "../dependencies";
import { errorHandler } from "../utils/error";
import { auth } from "../middlewares/auth";
import { validateUserStatus } from "../middlewares/validateUserStatus";

const router = Router();

const { itemController } = Dependencies.getInstance();

router.post('/create', auth, validateUserStatus, errorHandler(itemController.create));
router.put('/:id', auth, validateUserStatus, errorHandler(itemController.update));
router.delete('/:id', auth, validateUserStatus, errorHandler(itemController.delete));
router.get('/:itemsGroupId', auth, validateUserStatus, errorHandler(itemController.selectAllFromItemsGroup));

export default router;