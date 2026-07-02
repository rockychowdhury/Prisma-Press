import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";



const getPostList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const generateUserPostStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const getPostDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});


export const postController = {
    getPostList,
    generateUserPostStats,
    getMyPosts,
    getPostDetails,
    createPost,
    updatePost,
    deletePost
}