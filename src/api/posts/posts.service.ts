import { Injectable } from "@nestjs/common";
import { PostEntity } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { UpdatePostInput, CreatePostInput } from "./args";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>
  ) {}
  async getPosts() {
    const query: FindManyOptions<PostEntity> = {
      select: {
        name: true,
        id: true,
        text: true,
      },
      order: {
        name: "DESC",
      },
    };
    return await this.postsRepository.find(query);
  }

  async getPost(id: number) {
    return await this.postsRepository.findOneBy({ id });
  }
  async update(id: number, post: UpdatePostInput) {
    await this.postsRepository.update(id, post);
    return await this.postsRepository.findOneBy({ id });
  }
  async create(post: CreatePostInput) {
    return await this.postsRepository.save(post);
  }
  async delete(id: number) {
    await this.postsRepository.delete({ id });
    return { id: -1 };
  }
}
