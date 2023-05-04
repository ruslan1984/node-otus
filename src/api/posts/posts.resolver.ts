import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { PostEntity } from "./post.entity";
import { PostsService } from "./posts.service";
import { UpdatePostInput, CreatePostInput } from "./args";

@Resolver((of) => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  @Query(() => [PostEntity], { name: "posts" })
  getPosts() {
    return this.postsService.getPosts();
  }

  @Query(() => PostEntity, { name: "post" })
  getPost(@Args("id") id: number) {
    return this.postsService.getPost(id);
  }

  @Mutation(() => PostEntity, { name: "updatePost" })
  updatePost(
    @Args("id") id: number,
    @Args("updatePostInput") updatePostInput: UpdatePostInput
  ) {
    return this.postsService.update(id, updatePostInput);
  }

  @Mutation(() => PostEntity, { name: "createPost" })
  createPost(@Args("createPostInput") createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Mutation(() => PostEntity, { name: "deletePost" })
  deletePost(@Args("id") id: number) {
    return this.postsService.delete(id);
  }
}
