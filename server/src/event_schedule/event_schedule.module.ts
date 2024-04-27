import { Module } from '@nestjs/common';
import { EventScheduleService } from './event_schedule.service';
import { EventScheduleController } from './event_schedule.controller';

@Module({
  controllers: [EventScheduleController],
  providers: [EventScheduleService],
})
export class EventScheduleModule {}
