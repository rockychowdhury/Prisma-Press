import { NextFunction, Request, RequestHandler, Response } from "express";
import status from "http-status";

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log("error from catchAsync");
            res.status(status.INTERNAL_SERVER_ERROR).json(
                {
                    success: false,
                    statusCode: status.INTERNAL_SERVER_ERROR,
                    message: (error as Error).message,
                    error : error
                }
            )
        }
    }
}