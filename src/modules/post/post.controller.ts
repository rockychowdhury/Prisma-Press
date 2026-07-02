import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";


const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.id;
    const payload = req.body;
    const result = await postService.createPost(payload, userId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Post created Successfully",
        data: result
    })

});

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAllPosts();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Post fetched successful",
        data: posts
    })
});

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    if (!postId) {
        throw new Error("Post is not provided");
    }

    const result = await postService.getPostById(postId as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Post get success",
        data: result
    })
});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    // console.log(authorId);
    const posts = await postService.getMyPosts(authorId as string);
    // console.log("error from controller", req.user);
    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Post fetched success",
        data: posts
    });
});


const generateUserPostStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});



const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});


export const postController = {
    getAllPosts,
    generateUserPostStats,
    getMyPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}