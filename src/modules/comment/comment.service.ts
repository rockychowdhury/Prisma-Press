import { prisma } from "../../lib/prisma"
import { ICommentCreatePayload, ICommentUpdatePayload, IModerateComment } from "./comment.interface"


const getCommentsByAuthorId = async (authorId: string) => {
    const comments = await prisma.comment.findMany(
        {
            where: {
                authorId: authorId
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        }
    );
    return comments;
}

const getCommentsByPostId = async (postId: string) => {
    const comments = await prisma.comment.findMany({
        where: { postId }
    });
    return comments;
}

const createComment = async (payload: ICommentCreatePayload, authorId: string) => {
    await prisma.post.findFirstOrThrow(
        {
            where: {
                id: payload.postId
            }
        }
    );

    const comment = await prisma.comment.create(
        {
            data: {
                ...payload,
                authorId
            }
        }
    );

    return comment;
}


const updateComment = async (commentId: string, payload: ICommentUpdatePayload, authorId: string) => {
    const comment = await prisma.comment.findUniqueOrThrow({
        where: { id: commentId, authorId },
        select: { id: true }
    });
    const updatedComment = await prisma.comment.update(
        {
            where: {
                id: commentId,
                authorId
            },
            data: payload
        }
    );
    return updatedComment;

}

const deleteComment = async (commentId: string, authorId: string, isAdmin: boolean) => {
    const comment = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId
        }
    });
    if (comment.authorId !== authorId && !isAdmin) {
        throw new Error("Forbidden! you don't have permission to perform this action")
    }
    await prisma.comment.delete({
        where: { id: commentId }
    });
    return null;
}

const moderateComment = async (commentId: string, payload: IModerateComment) => {
    const comment = await prisma.comment.findUniqueOrThrow({
        where: { id: commentId },
        select: {
            id: true,
            status: true
        }
    });

    if (comment.status === payload.status) {
        throw new Error("Already up to date");
    }

    const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: payload
    });

    return updatedComment;
}




export const commentService = {
    createComment,
    getCommentsByPostId,
    getCommentsByAuthorId,
    updateComment,
    deleteComment,
    moderateComment
}