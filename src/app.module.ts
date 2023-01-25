import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { TrackHistoryModule } from './track_history/track_history.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/nest'),
    UserModule,
    DepartmentModule,
    EmployeeModule,
    TrackHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
