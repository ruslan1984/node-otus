import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  @Field(() => Int)
  id: number;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  login: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  password: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  name: string;

  @Column({ type: "character varying" })
  @Field({ nullable: true })
  surname: string;

  @Column({ type: "time with time zone" })
  @Field({ nullable: true })
  created_at: string;

  @Column({ type: "time with time zone" })
  @Field({ nullable: true })
  updated_at: string;
}
