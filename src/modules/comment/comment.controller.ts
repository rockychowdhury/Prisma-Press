import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";



const getCommentDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const getAuthorComments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const moderateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});


export const commentController = {
    createComment,
    getCommentDetails,
    getAuthorComments,
    updateComment,
    deleteComment,
    moderateComment
}

