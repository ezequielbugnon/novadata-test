import { createClient } from "redis";
import PostsDto from "../domain/posts-dto";
import IPostRepository, {
  PostPresenter,
} from "../domain/posts.repository.interface";
import { envs } from "../../../libs/env";

export default class PostService {
  private redisClient: any;

  constructor(private readonly repository: IPostRepository) {
    this.ConnectionRedis();
  }

  private async ConnectionRedis() {
    const redis = createClient({
      url:"redis://redis:6379",
    });

    redis.on("error", (err) => console.log("Redis Client Error", err));

    this.redisClient = await redis.connect();
  }

  async create(post: {
    title: string;
    content: string;
    image: string;
    authorId: number;
    categoryId: number;
  }): Promise<PostPresenter> {
    try {
      const postDto = new PostsDto(post);
      return await this.repository.create(postDto.getPost());
    } catch (error) {
      throw error;
    }
  }

  async listAllByUser(idUser: number): Promise<Array<PostPresenter>> {
    return await this.repository.listByUser(idUser);
  }

  async listAll(): Promise<Array<PostPresenter>> {
    try {
      const posts = await this.redisClient.get("posts");

      if (posts) {
        return JSON.parse(posts);
      }

      const response = await this.repository.list();

      await this.redisClient.set("posts", JSON.stringify(response), {
        EX: envs.CACHE_TTL,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: number): Promise<string> {
    return await this.repository.delete(id);
  }

  async getOne(id: number): Promise<PostPresenter | null> {
    return await this.repository.getOne(id);
  }

  async updatePost(post: { title?: string; content?: string; id: number }) {
    return await this.repository.updatePost(post);
  }

  async clearCache() {
    const response = await this.redisClient.del("posts");
    if (response == 1) {
      return "Deleted Successfully!";
    } else {
      return "Cannot delete";
    }
  }
}
