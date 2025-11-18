import { Router } from 'express';

import * as itemController from '../controllers/item.controller.ts';
import { validateCreateItem, validateUpdateItem } from '../middlewares/item.validate.ts';

const router = Router();

router.post('/item', validateCreateItem, itemController.createItem);

router.put('/item/:id', validateUpdateItem, itemController.updateItem);

router.get('/item/:id', itemController.getItem);

router.get('/item', itemController.getAllItem);

router.delete('/item/:id', itemController.deleteItem);

export default router;
