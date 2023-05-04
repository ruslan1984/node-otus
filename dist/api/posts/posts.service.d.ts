import PostEntity from "./post.entity";
import { Repository } from "typeorm";
export declare class PostsService {
    private readonly postsRepository;
    constructor(postsRepository: Repository<PostEntity>);
    getPosts(): Promise<PostEntity[]>;
}
