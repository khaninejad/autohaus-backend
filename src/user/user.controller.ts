import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserInterface } from './dto/user.interface';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      name,
      email,
      role: 'user',
      password: hashedPassword,
    });
    delete user.password;
    return user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login({ username, password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findAll() {
    const users = await this.userService.findAll();

    return users.map((user): UserInterface => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
      };
    });
  }
}
