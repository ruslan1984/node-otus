import MyPost from 'src/api/posts/post.entity';
import { Repository } from 'typeorm';
export declare class PostsController {
    private postsRepository;
    constructor(postsRepository: Repository<MyPost>);
    getAll(): Promise<MyPost[]>;
    getById(id: number): Promise<MyPost>;
    update(id: number, post: MyPost): Promise<import("typeorm").UpdateResult>;
    create(post: MyPost): Promise<MyPost>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
