import { Post } from "./post.model";
import { GetPostArgs } from "./args";
export declare class PostsService {
    private posts;
    getPosts(getUserPostsArgs: GetPostArgs): Post[];
}
