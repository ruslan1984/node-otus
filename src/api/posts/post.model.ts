import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// @Entity("posts")
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field({ nullable: false })
  text: string;
}
