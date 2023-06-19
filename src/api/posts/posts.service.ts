import { Injectable } from "@nestjs/common";
import { PostEntity } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import {
  UpdatePostInput,
  CreatePostInput,
  PaginateInput,
  PostTypeInput,
} from "./args";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>
  ) {}
  async getPosts(paginateInput?: PaginateInput, postTypeInput?: PostTypeInput) {
    let take = 0;
    let skip = 3;
    if (paginateInput?.length) {
      take = paginateInput.length;
    }
    if (paginateInput?.page) {
      skip = (paginateInput.page - 1) * take;
    }
    let type = "post";
    if (postTypeInput.type) {
      type = postTypeInput.type;
    }
    const query: FindManyOptions<PostEntity> = {
      where: {
        type,
      },
      order: {
        sort: "ASC",
      },
      take,
      skip,
    };

    const data = await this.postsRepository.findAndCount(query);
    return {
      list: data[0],
      count: Number(data[1]),
    };
  }

  async getPost(id: number) {
    return await this.postsRepository.findOneBy({ id });
  }
  async update(id: number, post: UpdatePostInput) {
    post["updated_at"] = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    await this.postsRepository.update(id, post);
    return await this.postsRepository.findOneBy({ id });
  }
  async create(post: CreatePostInput) {
    post["created_at"] = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    post["updated_at"] = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    return await this.postsRepository.save(post);
  }
  async delete(id: number) {
    await this.postsRepository.delete({ id });
    return { id: -1 };
  }
}
