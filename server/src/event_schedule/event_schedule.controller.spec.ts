import { Test, TestingModule } from '@nestjs/testing';
import { EventScheduleController } from './event_schedule.controller';
import { EventScheduleService } from './event_schedule.service';

describe('EventScheduleController', () => {
  let controller: EventScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventScheduleController],
      providers: [EventScheduleService],
    }).compile();

    controller = module.get<EventScheduleController>(EventScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
