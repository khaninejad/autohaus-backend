import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.create({
      name,
      email,
      role: 'user',
      password: hashedPassword,
    });
  }

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const fetchedUser = await this.userService.findOne({
      email,
    });
    if (!fetchedUser) {
      throw new BadRequestException('invalid email or password');
    }

    if (!(await bcrypt.compare(password, fetchedUser.password))) {
      throw new BadRequestException('invalid email or password');
    }

    const payload = {
      email: fetchedUser.email,
      role: fetchedUser.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '60s',
      }),
    };
  }
}
