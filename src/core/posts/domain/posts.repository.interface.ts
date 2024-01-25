import PostsDto from "./posts-dto";

export interface PostPresenter {
  id: number;
  title: string;
  content: string;
  image: string | null;
  authorId: number;
  categoryId: number;
  createdAt: Date;
}

export interface Post {
  title: string;
  content: string;
  image: string;
  authorId: number;
  categoryId: number;
}

export default interface IPostRepository {
  create(post: Post): Promise<PostPresenter>;
  updatePost(post: {
    title?: string;
    content?: string;
    id: number;
  }): Promise<PostPresenter>;
  listByUser(userId: number): Promise<Array<PostPresenter>>;
  list(): Promise<Array<PostPresenter>>;
  delete(id: number): Promise<string>;
  getOne(id: number): Promise<PostPresenter | null>;
  createByIA(prompt: string): Promise<PostPresenter>;
  resetCache(): string;
}
