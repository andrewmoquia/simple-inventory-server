import { Response } from 'express';

export type ApiResponseError = {
    message: string;
    data?: Record<string, unknown> | null;
};

export type ApiResponseSuccess = {
    message: string;
    data: Record<string, unknown>;
};

export const formatApiResponse = {
    internalServerError: (res: Response, { message, data = null }: ApiResponseError) => {
        return res.status(500).json({
            status: false,
            message,
            data,
        });
    },
    ok: (res: Response, { message, data }: ApiResponseSuccess) => {
        return res.status(200).json({
            status: true,
            message,
            data,
        });
    },
    notFound: (res: Response, { message, data = null }: ApiResponseError) => {
        return res.status(404).json({
            status: false,
            message,
            data,
        });
    },
    badRequest: (res: Response, { message, data = null }: ApiResponseError) => {
        return res.status(400).json({
            status: false,
            message,
            data,
        });
    },
};
