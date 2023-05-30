import { PostEntity } from "./post.entity";
import { PostsService } from "./posts.service";
import { UpdatePostInput, CreatePostInput, PaginateInput } from "./args";
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(paginateInput: PaginateInput): Promise<{
        list: PostEntity[];
        count: number;
    }>;
    getPost(id: number): Promise<PostEntity>;
    updatePost(id: number, updatePostInput: UpdatePostInput): Promise<PostEntity>;
    createPost(createPostInput: CreatePostInput): Promise<CreatePostInput & PostEntity>;
    deletePost(id: number): Promise<{
        id: number;
    }>;
}
