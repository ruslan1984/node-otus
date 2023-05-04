import { Injectable } from "@nestjs/common";
import { Post } from "./post.model";

@Injectable()
export class PostsService {
  private users: Post[] = [];
  public getUsers(getUsersArgs: any): Post[] {
    return [
      {
        id: 1,
        name: "text",
        text: "123",
      },
    ]; //getUsersArgs.userIds.map(userId => this.getUser({ userId }));
  }
}
