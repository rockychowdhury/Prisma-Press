import e, { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";



const getCommentByPostId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const comments = await commentService.getCommentsByPostId(postId as string);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Fetched Comments",
        data: comments,
    });
});

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const authorId = req.user?.id;

    const comment = await commentService.createComment(payload, authorId as string);

    sendResponse(res,
        {
            success: true,
            statusCode: status.CREATED,
            message: "Created Comment",
            data: comment
        }
    )
});
const getCommentsByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    const comments = await commentService.getCommentsByAuthorId(authorId as string);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Comment fetched",
        data: comments
    });

});

const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const commentId = req.params.commentId;
    const authorId = req.user?.id;
    const updatedComment = await commentService.updateComment(commentId as string, payload, authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Updated comment",
        data: updatedComment
    });
});

const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    await commentService.deleteComment(commentId as string, authorId as string, isAdmin);

    sendResponse(res, {
        success: true,
        statusCode: status.NO_CONTENT,
        data: {},
        message: "Deleted Comment"
    })
});

const moderateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const commentId = req.params.commentId;

    const updatedComment = await commentService.moderateComment(commentId as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "status updated",
        data: updatedComment
    })
});


export const commentController = {
    createComment,
    getCommentByPostId,
    getCommentsByAuthorId,
    updateComment,
    deleteComment,
    moderateComment
}

