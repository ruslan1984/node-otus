import MyPost from "src/api/posts/post.entity";
import { Repository } from "typeorm";
export declare class PostsController {
    private postsRepository;
    constructor(postsRepository: Repository<MyPost>);
    getAll(): Promise<MyPost[]>;
}
