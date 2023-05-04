import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { AppController } from "./app.controller";
// import { PostsController } from "src/api/posts/posts.controller";
// import { AppService } from "./app.service";
import { AuthModule } from "./api/auth/auth.module";
// import { UsersModule } from "./api/users/users.module";
// import Post from "./api/posts/post.entity";
import { PostsResolver } from "./api/posts/posts.resolver";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "",
      password: "",
      database: "otus",
      // entities: [Post],
      synchronize: false,
    }),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    // }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
    // PostsModule,
    // TypeOrmModule.forFeature([Post]),
    AuthModule,
    // UsersModule,
  ],
  controllers: [],
  providers: [PostsResolver],
})
export class AppModule {}
