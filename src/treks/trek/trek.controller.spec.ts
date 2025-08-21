import { Test, TestingModule } from '@nestjs/testing';
import { TrekController } from './trek.controller';

describe('TrekController', () => {
  let controller: TrekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrekController],
    }).compile();

    controller = module.get<TrekController>(TrekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
