import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
@ObjectType()

export class PostEntity {
  @PrimaryGeneratedColumn("increment")
  @Field(() => Int)
  id: number;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  name: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  text: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  title: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  meta_keywords: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  meta_description: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  type: string;

  @Column({ type: "bigint" })
  @Field({ nullable: true })
  sort: number;

  @Column({ type: "time with time zone" })
  @Field({ nullable: true })
  created_at: string;
  
  @Column({ type: "time with time zone" })
  @Field({ nullable: true })
  updated_at: string;
}

@ObjectType({ isAbstract: true })
export class PostListEntity {
  @Field(() => [PostEntity], { nullable: true })
  list: [PostEntity];
  @Field({ nullable: true })
  count: Number;
}