import { Test, TestingModule } from '@nestjs/testing';
import { SpecialTreksService } from './special-treks.service';

describe('SpecialTreksService', () => {
  let service: SpecialTreksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialTreksService],
    }).compile();

    service = module.get<SpecialTreksService>(SpecialTreksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
