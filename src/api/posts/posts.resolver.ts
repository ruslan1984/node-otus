import { Query, Resolver, Args } from "@nestjs/graphql";
import { PostModel } from "./post.model";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { PostsService } from "./posts.service";
import { GetPostArgs } from "./args";

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostModel], { name: "posts" })
  getPosts3() {
    return this.postsService.getPosts();
  }
}
