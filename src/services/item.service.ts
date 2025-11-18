import type { Request, Response } from 'express';

import { ItemModel } from '../models/item.model.ts';

export const createItemInDB = async (req: Request, res: Response) => {
    try {
        const { name, quantity, category } = req.body;

        const newItem = new ItemModel({
            name,
            quantity,
            category,
        });

        const savedItem = await newItem.save();

        return res.status(201).json(savedItem); // 201 Created
    } catch (error) {
        const ex = error as Error;
        return res.status(500).json({ message: ex.message || 'Internal server error' });
    }
};
