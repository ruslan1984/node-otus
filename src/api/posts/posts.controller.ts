import { Controller, Get } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import MyPost from "src/api/posts/post.entity";
import { FindManyOptions, Repository } from "typeorm";

@Controller("posts")
export class PostsController {
  constructor(
    @InjectRepository(MyPost)
    private postsRepository: Repository<MyPost>
  ) {}
  @Get()
  getAll() {
    const query: FindManyOptions<MyPost> = {
      select: {
        name: true,
        id: true,
        text: true,
      },
      order: {
        name: "DESC",
      },
    };
    return this.postsRepository.find(query);
  }
}
