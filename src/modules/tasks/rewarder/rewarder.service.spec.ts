import { Test, TestingModule } from '@nestjs/testing';
import { RewarderService } from './rewarder.service';

describe('RewarderService', () => {
  let service: RewarderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewarderService],
    }).compile();

    service = module.get<RewarderService>(RewarderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
