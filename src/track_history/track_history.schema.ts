import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../user/user.schema';
import { Employee } from '../employee/employee.schema';

export type TrackHistoryDocument = HydratedDocument<TrackHistory>;

@Schema()
export class TrackHistory {
  _id: string;

  @Prop()
  action: 'assign' | 'move' | string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employee: Employee;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  created_at: string;
}

export const TrackHistorySchema = SchemaFactory.createForClass(TrackHistory);
