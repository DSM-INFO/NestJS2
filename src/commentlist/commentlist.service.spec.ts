import { Test, TestingModule } from '@nestjs/testing';
import { CommentlistService } from './commentlist.service';

describe('CommentlistService', () => {
  let service: CommentlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentlistService],
    }).compile();

    service = module.get<CommentlistService>(CommentlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
