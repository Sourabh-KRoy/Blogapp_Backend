import { Test, TestingModule } from '@nestjs/testing';
import { UpcomingTreksController } from './upcoming-treks.controller';

describe('UpcomingTreksController', () => {
  let controller: UpcomingTreksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpcomingTreksController],
    }).compile();

    controller = module.get<UpcomingTreksController>(UpcomingTreksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
