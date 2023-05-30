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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const post_entity_1 = require("./post.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PostsService = class PostsService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    async getPosts(paginateInput) {
        const take = paginateInput.length;
        const skip = (paginateInput.page - 1) * take;
        const query = {
            order: {
                sort: "ASC",
            },
            take,
            skip,
        };
        const data = await this.postsRepository.findAndCount(query);
        return {
            list: data[0],
            count: Number(data[1]),
        };
    }
    async getPost(id) {
        return await this.postsRepository.findOneBy({ id });
    }
    async update(id, post) {
        post["updated_at"] = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "");
        await this.postsRepository.update(id, post);
        return await this.postsRepository.findOneBy({ id });
    }
    async create(post) {
        post["created_at"] = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "");
        post["updated_at"] = new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "");
        return await this.postsRepository.save(post);
    }
    async delete(id) {
        await this.postsRepository.delete({ id });
        return { id: -1 };
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map