import { Router } from 'express';

import * as itemController from '../controllers/item.controller.ts';

const router = Router();

router.post('/item', itemController.createItem);

router.put('/item/:id', itemController.updateItem);

router.get('/item/:id', itemController.getItem);

router.get('/item', itemController.getAllItem);

router.delete('/item/:id', itemController.deleteItem);

export default router;
