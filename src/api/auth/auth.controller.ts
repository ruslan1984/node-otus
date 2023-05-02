import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/api/auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
