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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostListEntity = exports.PostEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let PostEntity = class PostEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PostEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character varying" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character varying" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character varying" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character varying" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "meta_keywords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character varying" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "meta_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character varying" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PostEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time with time zone" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time with time zone" }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "updated_at", void 0);
PostEntity = __decorate([
    (0, typeorm_1.Entity)("posts"),
    (0, graphql_1.ObjectType)()
], PostEntity);
exports.PostEntity = PostEntity;
let PostListEntity = class PostListEntity {
};
__decorate([
    (0, graphql_1.Field)(() => [PostEntity], { nullable: true }),
    __metadata("design:type", Array)
], PostListEntity.prototype, "list", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PostListEntity.prototype, "count", void 0);
PostListEntity = __decorate([
    (0, graphql_1.ObjectType)({ isAbstract: true })
], PostListEntity);
exports.PostListEntity = PostListEntity;
//# sourceMappingURL=post.entity.js.map