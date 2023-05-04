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
}
