import { beforeEach, expect, it, describe } from "vitest";

import IPostRepository, {
    Post,
  PostPresenter,
} from "../domain/posts.repository.interface";
import PostService from "./posts.service";

let postService: PostService;

class mockRepository implements IPostRepository {
  updatePost(post: {
    title?: string;
    content?: string;
    id: number;
  }): Promise<PostPresenter> {
    const response = {
      id: 1,
      title: "",
      content: "",
      image: "",
      authorId: 1,
      categoryId: 1,
      createdAt: new Date(),
    }

    return Promise.resolve(response)
  }
  listByUser(userId: number): Promise<PostPresenter[]> {
    return Promise.resolve([
      {
        id: 1,
        title: "",
        content: "",
        image: "",
        authorId: 1,
        categoryId: 1,
        createdAt: new Date(),
      }
    ])
  }

  list(): Promise<PostPresenter[]> {
    return Promise.resolve([
      {
        id: 1,
        title: "",
        content: "",
        image: "",
        authorId: 1,
        categoryId: 1,
        createdAt: new Date(),
      }
    ])
  }
  delete(id: number): Promise<string> {
    return Promise.resolve('Post deleted')
  }
  getOne(id: number): Promise<PostPresenter | null> {
    return Promise.resolve(null)
  }
  createByIA(prompt: string): Promise<PostPresenter> {
    throw new Error("Method not implemented.");
  }
  resetCache(): string {
    throw new Error("Method not implemented.");
  }
  create(post: Post): Promise<PostPresenter> {
    return Promise.resolve({
      id: 1,
      title: "",
      content: "",
      image: "",
      authorId: 1,
      categoryId: 1,
      createdAt: new Date(),
    });
  }
}

describe("test post.service", () => {
  beforeEach(() => {
    const repository = new mockRepository();
    postService = new PostService(repository);
  });

  it("create post", () => {
    const post = {
        title: 'title',
        content: "content",
        image: "",
        authorId: 1,
        categoryId: 1,
    }
    const response = postService.create(post);

    expect(response).resolves.toBeTypeOf('object')
  });

  it("getPostbyUser", () => {
    const response = postService.listAllByUser(1)

    const data = [
      {
        id: 1,
        title: "",
        content: "",
        image: "",
        authorId: 1,
        categoryId: 1,
        createdAt: new Date(),
      }
    ]

    expect(response).resolves.toEqual(data)
  })

  it("list all posts", () => {
    const response = postService.listAllByUser(1)

    const data = [
      {
        id: 1,
        title: "",
        content: "",
        image: "",
        authorId: 1,
        categoryId: 1,
        createdAt: new Date(),
      }
    ]

    expect(response).resolves.toEqual(data)
  })

  it("Delete post", () => {
    const response = postService.delete(1)

    expect(response).resolves.toEqual('Post deleted')
  })

  it("Get One post", () => {
    const response = postService.getOne(1)

    expect(response).resolves.toEqual(null)
  })


  it("Updated Post", () => {
    const post = {
      title: 'title',
      content: "content",
      id:1
  }
  const response = postService.updatePost(post);

  expect(response).resolves.toBeTypeOf('object')
  })
});
