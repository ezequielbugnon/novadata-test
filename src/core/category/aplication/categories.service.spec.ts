import { describe, it, beforeEach, expect } from "vitest";
import ICategoryRepository, { CategoryPresenter } from "../domain/categories.repository.interface";
import CategoryService from "./categories.service";

let categoryService: CategoryService;

class mockRepository implements ICategoryRepository{
    list(listPosts?: boolean): Promise<CategoryPresenter[]> {
        return Promise.resolve([{
            name: 'Category 1'
        }])
    }
    create(name: string): Promise<CategoryPresenter> {
        return Promise.resolve({
            name: 'Category 1'
        })
    }

}

describe('test category.service', () => {
    beforeEach(() => {
        const repository = new mockRepository()
        categoryService = new CategoryService(repository)
    })

    it('create category', () => {
        const response = categoryService.create("Category 1")

        expect(response).resolves.toEqual({
            name: "Category 1"
        })
    })

    it('list Category', () => {
        const response = categoryService.list(false)

        expect(response).resolves.toEqual([
            { name: "Category 1"}
        ])
    })
})