import { Test, TestingModule } from '@nestjs/testing';
import { StatuslistService } from './statuslist.service';

describe('StatuslistService', () => {
  let service: StatuslistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatuslistService],
    }).compile();

    service = module.get<StatuslistService>(StatuslistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
