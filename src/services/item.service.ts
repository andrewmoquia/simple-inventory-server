import type { Request, Response } from 'express';

import { formatApiResponse } from '../utilities/format.ts';
import { ItemModel } from '../models/item.model.ts';

export type UpdateItem = {
    name?: string;
    quantity?: number;
    category?: string;
};

export const createItemInDB = async (req: Request, res: Response) => {
    try {
        const { name, quantity, category } = req.body;

        const newItem = new ItemModel({
            name,
            quantity,
            category,
        });

        const savedItem = await newItem.save();

        return formatApiResponse.ok(res, {
            message: 'Item created successfully.',
            data: savedItem as unknown as Record<string, unknown>,
        });
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};

export const updateItemInDB = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates: UpdateItem = {};

        if (req.body.name !== undefined) updates.name = req.body.name;
        if (req.body.quantity !== undefined) updates.quantity = req.body.quantity;
        if (req.body.category !== undefined) updates.category = req.body.category;

        const updatedItem = await ItemModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedItem) {
            return formatApiResponse.notFound(res, {
                message: 'Item not found.',
            });
        }

        return formatApiResponse.ok(res, {
            message: 'Item updated successfully.',
            data: updatedItem as unknown as Record<string, unknown>,
        });
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};

export const getItemInDB = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const item = await ItemModel.findById(id).lean();

        if (!item) {
            return formatApiResponse.notFound(res, {
                message: 'Item not found.',
            });
        }

        return formatApiResponse.ok(res, {
            message: 'Item retrieved successfully.',
            data: item as unknown as Record<string, unknown>,
        });
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};

export const getAllItemInDB = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const [items, total] = await Promise.all([
            ItemModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            ItemModel.countDocuments(filter),
        ]);

        return formatApiResponse.ok(res, {
            message: 'Items retrieved successfully.',
            data: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                items,
            },
        });
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};

export const deleteItemInDB = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const item = await ItemModel.findByIdAndDelete(id);

        if (!item) {
            return formatApiResponse.notFound(res, {
                message: 'Item not found.',
            });
        }

        return formatApiResponse.ok(res, {
            message: 'Item deleted successfully.',
            data: item as unknown as Record<string, unknown>,
        });
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};
