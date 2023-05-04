import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { GetPostArgs } from "./args";
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(getPostsArgs: GetPostArgs): Post[];
}
