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
exports.CreatePostInput = exports.UpdatePostInput = exports.GetPostArgs = exports.GetPostsArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let GetPostsArgs = class GetPostsArgs {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GetPostsArgs.prototype, "id", void 0);
GetPostsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], GetPostsArgs);
exports.GetPostsArgs = GetPostsArgs;
let GetPostArgs = class GetPostArgs {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GetPostArgs.prototype, "id", void 0);
GetPostArgs = __decorate([
    (0, graphql_1.ArgsType)()
], GetPostArgs);
exports.GetPostArgs = GetPostArgs;
let UpdatePostInput = class UpdatePostInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePostInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePostInput.prototype, "text", void 0);
UpdatePostInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePostInput);
exports.UpdatePostInput = UpdatePostInput;
let CreatePostInput = class CreatePostInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "text", void 0);
CreatePostInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePostInput);
exports.CreatePostInput = CreatePostInput;
//# sourceMappingURL=args.js.map