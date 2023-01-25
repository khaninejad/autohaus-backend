import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Department } from '../department/department.schema';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
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
