import { describe, it, beforeEach, expect } from "vitest";
import ICategoryRepository, { CategoryPresenter } from "../domain/categories.repository.interface";
import CategoryService from "./categories.service";

let categoryService: CategoryService;

class mockRepository implements ICategoryRepository{
    delete(id: number): Promise<string> {
       return Promise.resolve("deleted")
    }

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

    getOne(id: number): Promise<CategoryPresenter> {
        return Promise.resolve({
            name: "Category 1"
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

    it("Delete Category", () => {
        const response = categoryService.delete(1)

        expect(response).resolves.toEqual("deleted")
    })

    it("GetOne Category", () => {
        const response = categoryService.getOne(1)
    })
})