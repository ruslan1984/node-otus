import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { AppController } from "./app.controller";
import { PostsController } from "src/api/posts/posts.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./api/auth/auth.module";
import { UsersModule } from "./api/users/users.module";
// import Post from "./api/posts/post.entity";
import { PostsResolver } from "./api/posts/posts.resolver";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PostsService } from "src/api/posts/posts.service";
import PostEntity from "src/api/posts/post.entity";
import { PostsModule } from "src/api/posts/posts.module";
import { PostModel } from "src/api/posts/post.model";
import { AppController } from "src/app.controller";
import { FindManyOptions, Repository } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "",
      password: "",
      database: "otus",
      entities: [PostEntity],
      synchronize: false,
    }),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    // }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    // }),
    TypeOrmModule.forFeature([PostEntity]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),

    // PostsModule,
    AuthModule,
    // UsersModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsResolver, PostsService],
})
export class AppModule {}
