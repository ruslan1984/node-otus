import { Query, Resolver, Args } from "@nestjs/graphql";
import { Post } from "./post.model";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Resolver((of) => Post)
export class PostsResolver {
  // @Query((returns) => [Post], { name: "posts", nullable: false })
  // async getPosts() {
  //   return "123";
  // }
  @Query(() => String)
  sayHello(): string {
    return "Hello !";
  }
}
