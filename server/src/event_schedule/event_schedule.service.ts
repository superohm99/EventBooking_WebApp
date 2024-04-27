import { Injectable } from '@nestjs/common';
import { CreateEventScheduleDto } from './dto/create-event_schedule.dto';
import { UpdateEventScheduleDto } from './dto/update-event_schedule.dto';

@Injectable()
export class EventScheduleService {
  create(createEventScheduleDto: CreateEventScheduleDto) {
    return 'This action adds a new eventSchedule';
  }

  findAll() {
    return `This action returns all eventSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventSchedule`;
  }

  update(id: number, updateEventScheduleDto: UpdateEventScheduleDto) {
    return `This action updates a #${id} eventSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventSchedule`;
  }
}
