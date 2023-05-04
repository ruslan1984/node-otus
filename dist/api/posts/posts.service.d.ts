import { PostEntity } from "./post.entity";
import { Repository } from "typeorm";
import { UpdatePostInput, CreatePostInput } from "./args";
export declare class PostsService {
    private readonly postsRepository;
    constructor(postsRepository: Repository<PostEntity>);
    getPosts(): Promise<PostEntity[]>;
    getPost(id: number): Promise<PostEntity>;
    update(id: number, post: UpdatePostInput): Promise<PostEntity>;
    create(post: CreatePostInput): Promise<CreatePostInput & PostEntity>;
    delete(id: number): Promise<{
        id: number;
    }>;
}
