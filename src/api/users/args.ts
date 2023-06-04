import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsArray, IsOptional } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  login: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  surname: string;

  @Field({ nullable: true })
  created_at: string;

  @Field({ nullable: true })
  updated_at: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  login: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  surname: string;
}
