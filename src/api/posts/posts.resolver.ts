import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { PostEntity, PostListEntity } from "./post.entity";
import { PostsService } from "./posts.service";
import { UpdatePostInput, CreatePostInput, PaginateInput } from "./args";
import { JwtAuthGuard } from "src/api/auth/jwt-auth.guard";

@Resolver((of) => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostListEntity, { name: "posts" })
  async getPosts(@Args("paginateInput") paginateInput: PaginateInput) {
    return this.postsService.getPosts(paginateInput);
  }

  @Query(() => PostEntity, { name: "post" })
  getPost(@Args("id") id: number) {
    return this.postsService.getPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostEntity, { name: "updatePost" })
  updatePost(
    @Args("id") id: number,
    @Args("updatePostInput") updatePostInput: UpdatePostInput
  ) {
    return this.postsService.update(id, updatePostInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostEntity, { name: "createPost" })
  createPost(@Args("createPostInput") createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostEntity, { name: "deletePost" })
  deletePost(@Args("id") id: number) {
    return this.postsService.delete(id);
  }
}
