import { PartialType } from '@nestjs/mapped-types';
import { CreateEventScheduleDto } from './create-event_schedule.dto';

export class UpdateEventScheduleDto extends PartialType(CreateEventScheduleDto) {}
