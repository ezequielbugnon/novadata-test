export interface CategoryPresenter{
    name: string,
    posts?: Array<any>
}

export default interface ICategoryRepository{
    create(name: string): Promise<CategoryPresenter>
    list(listPosts?: boolean): Promise<Array<CategoryPresenter>>
    delete(id: number) :Promise<string>
    getOne(id: number):Promise<CategoryPresenter>
}