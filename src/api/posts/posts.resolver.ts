import { Query, Resolver, Args } from "@nestjs/graphql";
import { Post } from "./post.model";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { PostsService } from "./posts.service";
import { GetPostArgs } from "./args";

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  // @Query((returns) => [Post], { name: "posts", nullable: false })
  // async getPosts() {
  //   return "123";
  // }
  // @Query(() => String)
  // sayHello(): string {
  //   return "Hello !";
  // }
  @Query(() => [Post], { name: "posts" })
  getPosts(@Args() getPostsArgs: GetPostArgs): Post[] {
    console.log(getPostsArgs);
    // console.log(this.postsService);
    // return [
    //   {
    //     id: 1,
    //     name: "text",
    //     text: "123",
    //   },
    // ];
    return this.postsService.getPosts(getPostsArgs);
  }
}
