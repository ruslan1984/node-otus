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
export class PaginateInput {
  @Field({ nullable: true })
  length?: number;
  @Field({ nullable: true })
  page?: number;
}

@InputType()
export class PostTypeInput {
  @Field()
  type?: "post" | "news" | "page";
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  meta_keywords?: string;

  @Field({ nullable: true })
  meta_description?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  sort?: number;
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

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  meta_keywords?: string;

  @Field({ nullable: true })
  meta_description?: string;

  @Field({ nullable: true })
  type?: string;
}
