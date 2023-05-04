import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./api/auth/auth.module";
import { UsersModule } from "./api/users/users.module";
import { PostsResolver } from "./api/posts/posts.resolver";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PostsService } from "src/api/posts/posts.service";
import { PostEntity } from "src/api/posts/post.entity";

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

    TypeOrmModule.forFeature([PostEntity]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),

    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [PostsResolver, PostsService],
})
export class AppModule {}
