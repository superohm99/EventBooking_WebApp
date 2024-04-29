import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateSeatDto } from './dto/create-seat.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post(':id/createSeat')
  createSeat(@Param('id') id: string, @Body() createSeatDto: CreateSeatDto) {
    return this.eventsService.createSeat(id, createSeatDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }
}
