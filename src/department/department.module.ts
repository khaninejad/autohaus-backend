import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './department.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../shared/config';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: configuration().secretKey,
      signOptions: { expiresIn: configuration().expiresIn },
    }),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService, UserService],
})
export class DepartmentModule {}
