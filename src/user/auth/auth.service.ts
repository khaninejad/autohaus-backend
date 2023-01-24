import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { User } from '../user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(loginUser: any) {
    const user = await this.userService.findOne({ email: loginUser.username });
    const payload = { email: user.email, role: user.role, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
