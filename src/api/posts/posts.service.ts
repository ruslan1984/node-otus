import { Injectable } from "@nestjs/common";
import { Post } from "./post.model";

import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";

import { GetPostArgs } from "./args";

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  public getPosts(getUserPostsArgs: GetPostArgs): Post[] {
    return [
      {
        id: 2,
        name: "text",
        text: "123",
      },
    ];
    // return getUsersArgs.userIds.map(userId => this.getUser({ userId }));
  }
}
