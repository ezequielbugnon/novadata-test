import prisma from "../../../database/prismaClient";
import ICategoryRepository, { CategoryPresenter } from "../domain/categories.repository.interface";

export default class CategoryRepositoryPrisma implements ICategoryRepository{
    private db;
    constructor(){
        this.db = prisma;
    }

    async create(name: string): Promise<CategoryPresenter> {
        try {
           return await prisma.category.create({
                data: {
                    name
                }
            })
        } catch (error) {
            throw error
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
            throw error
        }
    }

}