import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface"




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
    const txResult = prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: {
                id: postId,
            },
            data: {
                views: {
                    increment: 1
                },
            }
        });
        // throw new Error ("fake error")
        const post = await tx.post.findFirstOrThrow(
            {
                where: {
                    id: postId
                },
                include: {
                    author: {
                        omit: {
                            password: true
                        }
                    },
                    comments: true,
                }
            }
        );
        return post;
    })

    return txResult;

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


const generatePostStats = async () => {
    const [
        aggregate,
        groupByStatusPost,
        groupByStatusComment,
        featured,
    ] = await Promise.all([

        // core aggregations
        prisma.post.aggregate({
            _count: { id: true },
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true }
        }),

        //groupBy status
        prisma.post.groupBy(
            {
                by: ["status"],
                _count: { id: true },
                _sum: { views: true }
            }
        ),

        //comment group by status
        prisma.comment.groupBy(
            {
                by: ["status"],
                _count: { id: true },
            }
        ),

        //featured post

        prisma.post.count({
            where: { isFeatured: true }
        }),
    ]);

    const totalPost = aggregate._count.id;
    const totalViews = aggregate._sum.views;
    const avgViewsPerPost = Math.ceil(aggregate._avg.views ?? 0);
    const maxViewsOnPost = aggregate._max.views;

    const totalFeaturedPost = featured;

    const PostByStatus = Object.fromEntries(
        groupByStatusPost.map((p) => [
            p.status, {
                count: p._count.id,
                views: p._sum.views,
            }
        ])
    );

    const commentsByStatus = groupByStatusComment.map((c) => [
        c.status, { count: c._count.id }
    ]);

    return {
        overview: {
            totalPost, totalViews, avgViewsPerPost, maxViewsOnPost, totalFeaturedPost, PostByStatus, commentsByStatus
        }
    }


}



const updatePost = async (payload: IUpdatePostPayload, postId: string, authorId: string, isAdmin: boolean) => {

    const post = await prisma.post.findUniqueOrThrow({
        where: { id: postId }
    });
    if (post.authorId !== authorId && !isAdmin) {
        throw new Error("Forbidden! You can not perform this action");
    }
    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: payload,
        include: {
            author: {
                omit: { password: true }
            },
            comments: true
        }
    });

    return updatedPost;
}


const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: { id: postId }
    });
    if (post.authorId !== authorId && !isAdmin) {
        throw new Error("Forbidden! You can not perform this action");
    }
    await prisma.post.delete(
        {
            where: { id: postId }
        }
    )
    return null;
}


export const postService = {
    getAllPosts,
    generatePostStats,
    getMyPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}