import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { UsersService } from "./users.service";
import { CreateUserInput, UpdateUserInput } from "./args";
import { JwtAuthGuard } from "src/api/auth/jwt-auth.guard";

@Resolver((of) => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserEntity], { name: "users" })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Mutation(() => UserEntity, { name: "createUser" })
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => UserEntity, { name: "user" })
  getUser(@Args("id") id: number) {
    return this.usersService.getUser(id);
  }
  // @UseGuards(JwtAuthGuard)
  @Mutation(() => UserEntity, { name: "updateUser" })
  updateUser(
    @Args("id") id: number,
    @Args("updateUserInput") updateUserInput: UpdateUserInput
  ) {
    return this.usersService.update(id, updateUserInput);
  }
  // @UseGuards(JwtAuthGuard)

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => PostEntity, { name: "deletePost" })
  // deletePost(@Args("id") id: number) {
  //   return this.postsService.delete(id);
  // }
}
