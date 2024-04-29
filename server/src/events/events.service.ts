import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Seat } from 'src/schemas/Seat.schema';
import { CreateEventDto, CreateEventSchDto, CreateVenueDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from 'src/schemas/Event.schema';
import { EventSchedule } from 'src/schemas/Event_schedule.schema';
import { Venue } from 'src/schemas/Venue.schema';
import { Ticket } from 'src/schemas/Ticket.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Seat.name) private seatModel: Model<Seat>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(EventSchedule.name) private eventScheduleModel: Model<EventSchedule>,
    @InjectModel(Venue.name) private venue: Model<Venue>,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
  ) { }

  async createSeat(event_id: string, createSeatDto: CreateSeatDto): Promise<Seat> {
    const newSeat = new this.seatModel(createSeatDto);
    await newSeat.save();

    const event = await this.eventModel.findById(event_id);

    const ticket = await this.ticketModel.findOne({ event: event._id });

    ticket.seats.push(newSeat._id);
    await ticket.save();

    return newSeat;
  }

  async create_event(createEventDto: CreateEventDto): Promise<Event> {
    const new_event = new this.eventModel(createEventDto);
    await new_event.save();
    console.log("new_event", new_event);
    const ticket = new this.ticketModel({
      event: new_event._id
    });

    await ticket.save();

    console.log("ticket from create event", ticket);

    return new_event;
  }

  async create_eventsch(eventschDto: CreateEventSchDto) {
    const new_eventSchedule = new this.eventScheduleModel({
      start_date: eventschDto.start_date,
      end_date: eventschDto.end_date,
      start_time: eventschDto.start_time,
      end_time: eventschDto.end_time
    })

    const event = await this.eventModel.findById(eventschDto.event_id);

    (await event).eventschedules.push(new_eventSchedule);

    (await event).save();
    await new_eventSchedule.save();
    return true
  }

  async create_venue(venueDto: CreateVenueDto) {
    const new_venue = new this.venue({
      name: venueDto.venue_name,
      location: venueDto.venue_location,
      capacity: venueDto.capacity
    })


    const event = await this.eventModel.findByIdAndUpdate(venueDto.event_id, { venue: new_venue._id });

    (await event).save();
    await new_venue.save();
    return true
  }

}
