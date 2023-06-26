import { Test, TestingModule } from '@nestjs/testing';
import { PointrewardController } from './pointreward.controller';

describe('PointrewardController', () => {
  let controller: PointrewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointrewardController],
    }).compile();

    controller = module.get<PointrewardController>(PointrewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
