import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../../../database/prismaClient";
import ICategoryRepository, {
  CategoryPresenter,
} from "../domain/categories.repository.interface";
import { CustomError } from "../../common/error/custom.error";

export default class CategoryRepositoryPrisma implements ICategoryRepository {
  private db;
  constructor() {
    this.db = prisma;
  }

  async create(name: string): Promise<CategoryPresenter> {
    try {
      return await prisma.category.create({
        data: {
          name,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async list(listPosts: boolean = false): Promise<CategoryPresenter[]> {
    try {
      const filter: {
        include?: {
          posts: boolean;
        };
      } = listPosts ? { include: { posts: true } } : {};

      return await prisma.category.findMany(filter);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async delete(id: number): Promise<string> {
    try {
      await this.db.category.delete({
        where: {
          id: id,
        },
      });

      return "Category deleted";
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw CustomError.badRequest("Record to delete does not exist.");
      } else {
        throw CustomError.internalServer("Internal Server Error");
      }
    }
  }

  async getOne(id: number): Promise<CategoryPresenter> {
    try {
      const response = await this.db.category.findFirst({
        where: {
          id,
        },
        include: {
          posts: true,
        },
      });

      if (!response) throw CustomError.notFound("Category not found");

      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw CustomError.notFound("Category not found");
      } else {
        throw error;
      }
    }
  }
}
