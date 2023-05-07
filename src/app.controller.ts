import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  sayHello() {
    return 'Hello!';
  }
}
