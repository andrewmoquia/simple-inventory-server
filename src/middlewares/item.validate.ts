import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { formatApiResponse } from '../utilities/format';

export const validateCreateItem = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('category')
        .isString()
        .withMessage('Category must be a string')
        .notEmpty()
        .withMessage('Category is required'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return formatApiResponse.badRequest(res, {
                message: 'Error validating request data',
                data: { errors: errors.array() },
            });
        }
        return next();
    },
];

export const validateUpdateItem = [
    body('name').optional().isString().withMessage('Name must be a string'),

    body('quantity').optional().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),

    body('category').optional().isString().withMessage('Category must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return formatApiResponse.badRequest(res, {
                message: 'Error validating request data',
                data: { errors: errors.array() },
            });
        }
        return next();
    },
];
