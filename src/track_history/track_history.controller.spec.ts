import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TrackHistoryController } from './track_history.controller';
import { TrackHistory } from './track_history.schema';
import { TrackHistoryService } from './track_history.service';

describe('TrackHistoryController', () => {
  let controller: TrackHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackHistoryController],
      providers: [
        TrackHistoryService,
        {
          provide: getModelToken(TrackHistory.name),
          useValue: {
            create: () => Promise.resolve(),
            findByEmployee: () => Promise.resolve(),
          },
        },
      ],
    }).compile();

    controller = module.get<TrackHistoryController>(TrackHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
