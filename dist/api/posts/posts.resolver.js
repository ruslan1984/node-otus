"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const post_entity_1 = require("./post.entity");
const posts_service_1 = require("./posts.service");
const args_1 = require("./args");
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getPosts(paginateInput) {
        return this.postsService.getPosts(paginateInput);
    }
    getPost(id) {
        return this.postsService.getPost(id);
    }
    updatePost(id, updatePostInput) {
        return this.postsService.update(id, updatePostInput);
    }
    createPost(createPostInput) {
        return this.postsService.create(createPostInput);
    }
    deletePost(id) {
        return this.postsService.delete(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.PostListEntity, { name: "posts" }),
    __param(0, (0, graphql_1.Args)("paginateInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [args_1.PaginateInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPosts", null);
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.PostEntity, { name: "post" }),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "getPost", null);
__decorate([
    (0, graphql_1.Mutation)(() => post_entity_1.PostEntity, { name: "updatePost" }),
    __param(0, (0, graphql_1.Args)("id")),
    __param(1, (0, graphql_1.Args)("updatePostInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, args_1.UpdatePostInput]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "updatePost", null);
__decorate([
    (0, graphql_1.Mutation)(() => post_entity_1.PostEntity, { name: "createPost" }),
    __param(0, (0, graphql_1.Args)("createPostInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [args_1.CreatePostInput]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "createPost", null);
__decorate([
    (0, graphql_1.Mutation)(() => post_entity_1.PostEntity, { name: "deletePost" }),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "deletePost", null);
PostsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => post_entity_1.PostEntity),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolver);
exports.PostsResolver = PostsResolver;
//# sourceMappingURL=posts.resolver.js.map