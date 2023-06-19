import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { FindManyOptions, Repository } from "typeorm";
import { CreateUserInput, UpdateUserInput } from "./args";
import { genSalt, hash } from "bcrypt";
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async getUsers() {
    const query: FindManyOptions = {
      order: {
        id: "ASC",
      },
    };
    return await this.usersRepository.find(query);
  }
  async getUser(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
  async getUserByLogin(login: string) {
    return await this.usersRepository.findOneBy({ login });
  }
  async update(id: number, user: UpdateUserInput) {
    user["updated_at"] = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOneBy({ id });
  }
  async create(user: CreateUserInput) {
    user["created_at"] = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    user["updated_at"] = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    const pass = await genSalt(10).then((salt) => hash(user.password, salt));
    user["password"] = pass;
    return await this.usersRepository.save(user);
  }
}
