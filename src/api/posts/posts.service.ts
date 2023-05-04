import { Injectable, Inject } from "@nestjs/common";
import PostEntity from "./post.entity";
import { PostModel } from "./post.model";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { GetPostArgs } from "./args";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>
  ) {}
  async getPosts() {
    const query: FindManyOptions<PostEntity> = {
      select: {
        name: true,
        id: true,
        text: true,
      },
      order: {
        name: "DESC",
      },
    };
    return await this.postsRepository.find(query);
  }
}
