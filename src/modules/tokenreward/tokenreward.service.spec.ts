import { Test, TestingModule } from '@nestjs/testing';
import { TokenrewardService } from './tokenreward.service';

describe('TokenrewardService', () => {
  let service: TokenrewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenrewardService],
    }).compile();

    service = module.get<TokenrewardService>(TokenrewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
