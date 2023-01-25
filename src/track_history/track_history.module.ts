import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';
import { TrackHistory, TrackHistorySchema } from './track_history.schema';
import { TrackHistoryService } from './track_history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrackHistory.name, schema: TrackHistorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [],
  providers: [TrackHistoryService, UserService],
  exports: [TrackHistoryService],
})
export class TrackHistoryModule {}
