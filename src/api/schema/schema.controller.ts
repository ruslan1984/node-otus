import { Controller, Post, Get, Request, UseGuards } from "@nestjs/common";
// import { AuthService } from 'src/api/auth/auth.service';
// import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
// import { LocalAuthGuard } from 'src/api/auth/local-auth.guard';
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { GraphQLSchemaHost } from "@nestjs/graphql";

@Controller("schema")
export class SchemaController {
  // constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post("generate")
  async scema(@Request() req) {
    const app = await NestFactory.create(AppModule);
    // await app.listen(process.env.PORT || 3001);

    // if (process.env.NODE_ENV === 'production') {
    // const { schema } = app.get(GraphQLSchemaHost);
    console.log(app);
    // writeFileSync(join(process.cwd(), `/src/schema.gql`), printSchema(schema));
    // }
    return "123";
  }
}
