import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackHistoryDto } from './dto/create-track-history.dto';
import { TrackHistory, TrackHistoryDocument } from './track_history.schema';

@Injectable()
export class TrackHistoryService {
  constructor(
    @InjectModel(TrackHistory.name)
    private trackHistoryModel: Model<TrackHistoryDocument>,
  ) {}

  create(createTrackHistoryDto: CreateTrackHistoryDto) {
    try {
      const createdHistory = new this.trackHistoryModel(createTrackHistoryDto);
      return createdHistory.save();
    } catch (error) {
      throw new Error('insertion error');
    }
  }

  findByEmployee(employee: string) {
    return this.trackHistoryModel
      .find({ employee: employee })
      .populate(['user', 'employee'])
      .exec();
  }
}
