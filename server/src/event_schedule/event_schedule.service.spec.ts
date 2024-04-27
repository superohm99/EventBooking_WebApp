import { Test, TestingModule } from '@nestjs/testing';
import { EventScheduleService } from './event_schedule.service';

describe('EventScheduleService', () => {
  let service: EventScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventScheduleService],
    }).compile();

    service = module.get<EventScheduleService>(EventScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
