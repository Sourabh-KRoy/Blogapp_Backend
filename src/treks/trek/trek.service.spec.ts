import { Test, TestingModule } from '@nestjs/testing';
import { TrekService } from './trek.service';

describe('TrekService', () => {
  let service: TrekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrekService],
    }).compile();

    service = module.get<TrekService>(TrekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
