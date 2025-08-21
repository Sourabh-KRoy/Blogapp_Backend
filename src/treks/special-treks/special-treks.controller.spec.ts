import { Test, TestingModule } from '@nestjs/testing';
import { SpecialTreksController } from './special-treks.controller';

describe('SpecialTreksController', () => {
  let controller: SpecialTreksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialTreksController],
    }).compile();

    controller = module.get<SpecialTreksController>(SpecialTreksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
