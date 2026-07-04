import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { IQuery } from "../../types";

export interface ICreatePostPayload {
    title: string;
    content: string;
    thumbnail?: string;
    isFeatured?: boolean;
    status?: PostStatus;
    tags: string[];
}


export interface IUpdatePostPayload {
    title?: string;
    content?: string;
    thumbnail?: string;
    isFeatured?: boolean;
    status?: PostStatus;
    tags?: string[];
}


export interface IPostQuery extends IQuery, PostWhereInput {
    containsTag?: string[]
}