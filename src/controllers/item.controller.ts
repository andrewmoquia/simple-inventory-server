import { Request, Response } from 'express';

import * as itemService from '../services/item.service';
import { formatApiResponse } from '../utilities/format';

export const createItem = async (req: Request, res: Response) => {
    try {
        return await itemService.createItemInDB(req, res);
    } catch (error) {
        const ex = error as Error;
        return res.status(500).json({ message: ex.message || 'Internal server error' });
    }
};

export const getItem = async (req: Request, res: Response) => {
    try {
        return await itemService.getItemInDB(req, res);
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};

export const getAllItem = async (req: Request, res: Response) => {
    try {
        return await itemService.getAllItemInDB(req, res);
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        return await itemService.updateItemInDB(req, res);
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        return await itemService.deleteItemInDB(req, res);
    } catch (error) {
        const ex = error as Error;
        return formatApiResponse.internalServerError(res, {
            message: ex.message || 'Internal server error',
        });
    }
};
