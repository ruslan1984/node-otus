export declare class PostEntity {
    id: number;
    name: string;
    text: string;
    title: string;
    meta_keywords: string;
    meta_description: string;
    type: string;
    sort: number;
    created_at: string;
    updated_at: string;
}
export declare class PostListEntity {
    list: [PostEntity];
    count: Number;
}
