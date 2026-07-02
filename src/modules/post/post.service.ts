import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"




const createPost = async (payload: ICreatePostPayload, userId: string) => {

    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    });

    return result;

}


const getAllPosts = async () => {
    const posts = await prisma.post.findMany(
        {
            include: {
                author: true,
                comments: true,
            }
        }
    );
    return posts;
}

const getPostById = async (postId: string) => {

    const post = await prisma.post.findFirstOrThrow(
        {
            where: {
                id: postId
            }
        }
    );

    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            views: {
                increment: 1
            },
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true,
        }
    })

    return updatedPost;

}

const getMyPosts = async (authorId: string) => {
    const posts = await prisma.post.findMany(
        {
            where: {
                authorId
            },
            include: {
                comments: true,
                author: {
                    omit:
                    {
                        password: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        }

    );
    return posts;
}


const generateUserPostStats = async () => {

}




const updatePost = async () => {

}


const deletePost = async () => {

}


export const postService = {
    getAllPosts,
    generateUserPostStats,
    getMyPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}