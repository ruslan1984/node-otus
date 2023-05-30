export declare class GetPostsArgs {
    id: string[];
}
export declare class GetPostArgs {
    id: string;
}
export declare class PaginateInput {
    length: number;
    page: number;
}
export declare class UpdatePostInput {
    name?: string;
    text?: string;
    title?: string;
    meta_keywords?: string;
    meta_description?: string;
    type?: string;
    sort?: number;
}
export declare class CreatePostInput {
    name: string;
    text?: string;
    title?: string;
    meta_keywords?: string;
    meta_description?: string;
    type?: string;
}
