import { Test, TestingModule } from '@nestjs/testing';
import { ReserveService } from './reserve.service';

describe('ReserveService', () => {
  let service: ReserveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReserveService],
    }).compile();

    service = module.get<ReserveService>(ReserveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
