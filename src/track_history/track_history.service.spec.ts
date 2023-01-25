import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TrackHistory } from './track_history.schema';
import { TrackHistoryService } from './track_history.service';

describe('HistoryService', () => {
  let service: TrackHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackHistoryService,
        {
          provide: getModelToken(TrackHistory.name),
          useValue: {
            create: () => Promise.resolve(),
            findOne: () => Promise.resolve(),
          },
        },
      ],
    }).compile();

    service = module.get<TrackHistoryService>(TrackHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
