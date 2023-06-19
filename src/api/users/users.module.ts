import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/api/users/user.entity";

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService, UsersResolver],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
