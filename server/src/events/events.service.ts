import { Injectable } from '@nestjs/common';
import { CreateEventDto, CreateEventSchDto, CreateVenueDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from 'src/schemas/Event.schema';
import { EventSchedule } from 'src/schemas/Event_schedule.schema';
import { Venue } from 'src/schemas/Venue.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(EventSchedule.name) private eventScheduleModel: Model<EventSchedule>,
    @InjectModel(Venue.name) private venue: Model<Venue>,
) {}

    async create_event(createEventDto: CreateEventDto) {
    
    const new_event = new this.eventModel({
      // id:generateUniqueId(),
      event_name:createEventDto.event_name,
      event_description:createEventDto.event_description,
      image:createEventDto.image,
      rating:createEventDto.rating,
    });



    await new_event.save();

    return true;
  }

  async create_eventsch(eventschDto: CreateEventSchDto){
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

  async create_venue(venueDto: CreateVenueDto){
    const new_venue = new this.venue({
      name: venueDto.venue_name,
      location: venueDto.venue_location,
      capacity: venueDto.capacity
    })

    const event = await this.eventModel.findByIdAndUpdate(venueDto.event_id,{venue:new_venue._id});

    (await event).save();
    await new_venue.save();
    return true
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
