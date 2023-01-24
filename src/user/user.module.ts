import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strtegy';
import configuration from '../shared/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: configuration().secretKey,
      signOptions: { expiresIn: configuration().expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
