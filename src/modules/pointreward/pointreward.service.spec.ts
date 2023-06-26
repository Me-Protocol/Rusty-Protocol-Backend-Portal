import { Test, TestingModule } from '@nestjs/testing';
import { PointrewardService } from './pointreward.service';

describe('PointrewardService', () => {
  let service: PointrewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointrewardService],
    }).compile();

    service = module.get<PointrewardService>(PointrewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
