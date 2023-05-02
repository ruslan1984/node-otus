import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MyPost from 'src/api/posts/post.entity';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { FindManyOptions, Repository } from 'typeorm';

@Controller('posts')
export class PostsController {
  constructor(
    @InjectRepository(MyPost)
    private postsRepository: Repository<MyPost>,
  ) {}
  @Get()
  getAll() {
    const query: FindManyOptions<MyPost> = {
      select: {
        name: true,
        id: true,
        text: true,
      },
      order: {
        name: 'DESC',
      },
    };
    return this.postsRepository.find(query);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.postsRepository.findOneBy({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() post: MyPost) {
    return await this.postsRepository.update(id, post);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() post: MyPost) {
    return await this.postsRepository.save(post);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postsRepository.delete({ id });
  }
}
