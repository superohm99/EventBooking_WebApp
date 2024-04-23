import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';

describe('ConcertService', () => {
  let service: ConcertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertService],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
