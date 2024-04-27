import { Test, TestingModule } from '@nestjs/testing';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';

describe('ReserveController', () => {
  let controller: ReserveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReserveController],
      providers: [ReserveService],
    }).compile();

    controller = module.get<ReserveController>(ReserveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
