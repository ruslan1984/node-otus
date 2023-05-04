import { PostsService } from "./posts.service";
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts3(): Promise<import("./post.entity").default[]>;
}
