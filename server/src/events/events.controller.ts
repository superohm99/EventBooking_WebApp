import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { CreateEventDto, CreateEventSchDto, CreateVenueDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Public } from 'src/users/common/decorators/src/common/decorators';
import { Venue } from 'src/schemas/Venue.schema';

@Public()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post(':id/create_seat')
  createSeat(@Param('id') id: string, @Body() createSeatDto: CreateSeatDto) {
    return this.eventsService.createSeat(id, createSeatDto);
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

  @Post('events_data')
  events_data(@Body('filter') filter:string): Promise<any>{
    if (filter)
      return this.eventsService.events_filter(filter);
    console.log("superohm")
    return  this.eventsService.events_data();
  }

  @Post('events_name')
  async getEvents(@Body('name') name: string): Promise<any> {
    if (name) {
      return this.eventsService.getEventsByName(name);
    }
    return this.eventsService.getAllEvents();
  }

  @Post('events_place')
  async getplace(@Body('id') id: string):  Promise<any>{
    console.log(id)
    if (id) {
      return this.eventsService.getplace(id);
    }
  }

  @Get('event_venues')
  async getvenue(){
    return this.eventsService.getallvenue();
  }



 
}
