export interface CategoryPresenter{
    name: string,
    posts?: Array<any>
}

export default interface ICategoryRepository{
    create(name: string): Promise<CategoryPresenter>
    list(listPosts?: boolean): Promise<Array<CategoryPresenter>>
}