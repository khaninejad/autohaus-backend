import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/nest'),
    UserModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
