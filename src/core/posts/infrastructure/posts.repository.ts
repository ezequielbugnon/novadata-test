import IPostRepository, {
  Post,
  PostPresenter,
} from "../domain/posts.repository.interface";
import { CustomError } from "../../common/error/custom.error";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import prisma from "../../../database/prismaClient";

export default class PostRepositoryPrisma implements IPostRepository {
  private db;
  constructor() {
    this.db = prisma;
  }

  async updatePost(post: {
    title?: string | undefined;
    content?: string | undefined;
    id: number;
  }): Promise<PostPresenter> {
    try {
      const { title, content, id } = post;

      if (!title && !content) {
        throw CustomError.badRequest("Title or content must be provided");
      }

      return await this.db.post.update({
        where: {
          id: id,
        },
        data: {
          title: title || undefined,
          content: content || undefined,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        throw CustomError.badRequest(
          "Error creating post, The data could be errors"
        );
      } else {
        throw error;
      }
    }
  }

  async create(post: Post): Promise<PostPresenter> {
    try {
      const [author, category] = await Promise.all([
        this.db.user.findFirst({
          where: {
            id: post.authorId,
          },
        }),
        this.db.category.findFirst({
          where: {
            id: post.categoryId,
          },
        }),
      ]);

      if (!category || !author) {
        throw CustomError.badRequest("The data is not correct");
      }

      return await this.db.post.create({
        data: post,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        throw CustomError.badRequest(
          "Error creating post, The data could be errors"
        );
      } else {
        throw error;
      }
    }
  }

  async list(): Promise<PostPresenter[]> {
    try {
      return await this.db.post.findMany({});
    } catch (error) {
      console.log(error);
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        throw CustomError.badRequest("Error reading post");
      } else {
        throw error;
      }
    }
  }

  async listByUser(userId: number): Promise<PostPresenter[]> {
    try {
      return await this.db.post.findMany({
        where: {
          authorId: userId,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        throw CustomError.badRequest("Error reading post");
      } else {
        throw error;
      }
    }
  }

  async delete(id: number): Promise<string> {
    try {
      await this.db.post.delete({
        where: {
          id: id,
        },
      });

      return "Post deleted";
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        throw CustomError.badRequest("Error deleting post");
      } else {
        throw error;
      }
    }
  }

  async getOne(id: number): Promise<PostPresenter | null> {
    try {
      return await this.db.post.findFirst({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        throw CustomError.badRequest("Error reading post");
      } else {
        throw error;
      }
    }
  }
  createByIA(prompt: string): Promise<PostPresenter> {
    throw new Error("Method not implemented.");
  }
  resetCache(): string {
    throw new Error("Method not implemented.");
  }
}
