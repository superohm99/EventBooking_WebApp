import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { CreateEventDto, CreateEventSchDto, CreateVenueDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Public } from 'src/users/common/decorators/src/common/decorators';

@Public()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post(':id/createSeat')
  createSeat(@Param('id') id: string, @Body() createSeatDto: CreateSeatDto) {
    return this.eventsService.createSeat(id, createSeatDto);
  }

  @Post(':id/createTicket')
  createTicket(@Param('id') id: string) {
    return this.eventsService.createTicket(id);
  }

  @Post('create_event')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create_event(createEventDto);
  }

  @Post('create_eventsch')
  create_sch(@Body() eventschDto: CreateEventSchDto) {
    return this.eventsService.create_eventsch(eventschDto);
  }

  @Post('create_venue')
  create_venue(@Body() venueDto: CreateVenueDto) {
    return this.eventsService.create_venue(venueDto);
    
  }
}
