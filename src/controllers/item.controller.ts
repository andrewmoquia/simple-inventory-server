import type { Request, Response } from 'express';

import * as itemService from '../services/item.service.ts';

export const createItem = async (req: Request, res: Response) => {
    try {
        await itemService.createItemInDB(req, res);
    } catch (error: any) {
        console.error('Controller error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
