import { Test, TestingModule } from '@nestjs/testing';
import { UpcomingTreksService } from './upcoming-treks.service';

describe('UpcomingTreksService', () => {
  let service: UpcomingTreksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpcomingTreksService],
    }).compile();

    service = module.get<UpcomingTreksService>(UpcomingTreksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
