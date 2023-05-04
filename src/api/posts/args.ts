import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsArray, IsOptional } from "class-validator";

@ArgsType()
export class GetPostsArgs {
  @Field(() => [String])
  @IsArray()
  id: string[];
}

@ArgsType()
export class GetPostArgs {
  @Field()
  id: string;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  text?: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  text?: string;
}
