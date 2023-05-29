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
}
