import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
// import { AuthController } from 'src/auth/auth.controller';
import { PostsController } from 'src/api/posts/posts.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
// import { LocalStrategy } from './auth/local.strategy';
import Post from './api/posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'otus',
      entities: [Post],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService],
})
export class AppModule {}
