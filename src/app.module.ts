import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { TrackHistoryModule } from './track_history/track_history.module';
import configuration from './shared/config';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().db_string),
    UserModule,
    DepartmentModule,
    EmployeeModule,
    TrackHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
