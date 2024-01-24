import { CustomError } from "../../common/error/custom.error";

export default class PostsDto{
    constructor(private readonly post: {
        title: string;
        content: string;
        image: string;
        authorId: number;
        categoryId: number;
    }){
        if (!post.title || typeof post.title !== 'string' || post.title.length > 50) {
            throw CustomError.badRequest('title is required, must be a string, and must not exceed 50 characters');
        }

        if (!post.content || typeof post.content !== 'string') {
            throw CustomError.badRequest('content is required and must be a string');
        }
    }

    getPost(){
        return this.post;
    }
}