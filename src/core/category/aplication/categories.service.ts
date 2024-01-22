import CategoryDto from "../domain/categories-dto";
import ICategoryRepository, { CategoryPresenter } from "../domain/categories.repository.interface";

export default class CategoryService {
    constructor(private readonly repository: ICategoryRepository){}

    async create(name: string): Promise<CategoryPresenter>{
        try {
           const category = new CategoryDto(name); 
           return await this.repository.create(category.get())
        } catch (error) {
           throw error
        }
    }

    async list(listPosts: boolean): Promise<Array<CategoryPresenter>>{
        try {
          return await this.repository.list(listPosts)  
        } catch (error) {
            throw error
        }
    }
}