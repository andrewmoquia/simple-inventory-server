import { Router } from 'express';

import * as itemController from '../controllers/item.controller.ts';

const router = Router();

router.get('/item', itemController.createItem);

export default router;
