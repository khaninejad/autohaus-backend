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
import { MulterModule } from '@nestjs/platform-express';
import { DepartmentService } from '../department/department.service';
import { Department, DepartmentSchema } from '../department/department.schema';
import { TrackHistoryService } from '../track_history/track_history.service';
import { TrackHistory, TrackHistorySchema } from 'src/track_history/track_history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: User.name, schema: UserSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: TrackHistory.name, schema: TrackHistorySchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: configuration().secretKey,
      signOptions: { expiresIn: configuration().expiresIn },
    }),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    UserService,
    DepartmentService,
    TrackHistoryService,
  ],
})
export class EmployeeModule {}
