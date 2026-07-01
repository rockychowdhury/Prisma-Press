import { NextFunction, Request, RequestHandler, Response } from "express";
import status from "http-status";

export const catchAsync = (fn: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res, next);
        } catch (error) {
            res.status(status.INTERNAL_SERVER_ERROR).json(
                {
                    success: false,
                    statusCode: status.INTERNAL_SERVER_ERROR,
                    message: "Failed to Create user",
                    error
                }
            )
        }
    }
}