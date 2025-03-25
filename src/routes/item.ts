import { Router } from "express";
import Dependencies from "../dependencies";
import { errorHandler } from "../utils/error";
import { auth } from "../middlewares/auth";

const router = Router();

const { itemController } = Dependencies.getInstance();

router.post('/create', auth, errorHandler(itemController.create));
router.put('/:id', auth, errorHandler(itemController.update));
router.delete('/:id', auth, errorHandler(itemController.delete));
router.get('/:itemsGroupId', auth, errorHandler(itemController.selectAllFromItemsGroup));

export default router;