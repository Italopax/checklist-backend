import { Router } from "express";
import { errorHandler } from "../utils/error";
import Dependencies from "../dependencies";
import { auth } from "../middlewares/auth";

const router = Router();

const { itemsGroupController } = Dependencies.getInstance();

router.get('/all', auth, errorHandler(itemsGroupController.selectAll));
router.post('/create', auth, errorHandler(itemsGroupController.create));
router.put('/:id', auth, errorHandler(itemsGroupController.update));
router.delete('/:id', auth, errorHandler(itemsGroupController.delete));

export default router;