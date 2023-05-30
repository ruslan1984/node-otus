import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./api/auth/auth.module";
import { UsersModule } from "./api/users/users.module";
import { PostsResolver } from "./api/posts/posts.resolver";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PostsService } from "src/api/posts/posts.service";
import { PostEntity, PostListEntity } from "src/api/posts/post.entity";
import { SchemaController } from "src/api/schema/schema.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "",
      password: "",
      database: "otus",
      entities: [PostEntity, PostListEntity],
      synchronize: false,
    }),

    TypeOrmModule.forFeature([PostEntity, PostListEntity]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      // autoSchemaFile: true,
      autoSchemaFile: "src/schema.gql",
    }),

    AuthModule,
    UsersModule,
  ],
  controllers: [SchemaController],
  providers: [PostsResolver, PostsService],
})
export class AppModule {}
