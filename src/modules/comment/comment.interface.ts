import { CommentStatus } from "../../../generated/prisma/enums"

export interface ICommentUpdatePayload {
    content?: string
    status?: CommentStatus
}

export interface ICommentCreatePayload {
    content: string
    postId: string
}

export interface IModerateComment {
    status: CommentStatus
}