import { Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Department } from '../department/department.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

export class Employee {
  _id: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  address: string;

  @Prop()
  job_title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Department;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
