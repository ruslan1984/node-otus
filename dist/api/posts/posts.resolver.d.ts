import { PostEntity } from "./post.entity";
import { PostsService } from "./posts.service";
import { UpdatePostInput, CreatePostInput } from "./args";
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(): Promise<PostEntity[]>;
    getPost(id: number): Promise<PostEntity>;
    updatePost(id: number, updatePostInput: UpdatePostInput): Promise<PostEntity>;
    createPost(createPostInput: CreatePostInput): Promise<CreatePostInput & PostEntity>;
    deletePost(id: number): Promise<{
        id: number;
    }>;
}
