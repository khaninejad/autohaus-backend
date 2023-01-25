import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../shared/config';
import { Employee, EmployeeSchema } from './employee.schema';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: configuration().secretKey,
      signOptions: { expiresIn: configuration().expiresIn },
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, UserService],
})
export class EmployeeModule {}
