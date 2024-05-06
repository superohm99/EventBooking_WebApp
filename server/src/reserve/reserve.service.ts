import { Injectable } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from 'src/schemas/Event.schema';
import { EventSchedule } from 'src/schemas/Event_schedule.schema';
import { Venue } from 'src/schemas/Venue.schema';
import { Ticket } from 'src/schemas/Ticket.schema';
import { Seat } from 'src/schemas/Seat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReserveService {
  constructor(
    @InjectModel(Seat.name) private seatModel: Model<Seat>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(EventSchedule.name) private eventScheduleModel: Model<EventSchedule>,
    @InjectModel(Venue.name) private venue: Model<Venue>,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
  ) { }
  
  async getdata_reserve(id:string){
    let lst_resp = []
    const event = await this.eventModel.findOne({_id:id});
    const venue = await this.venue.findOne({_id:event.venue})
    console.log(event.event_name);
    lst_resp.push(event)
    lst_resp.push(venue)
    return lst_resp
  }

  create(createReserveDto: CreateReserveDto) {
    return 'This action adds a new reserve';
  }

  findAll() {
    return `This action returns all reserve`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reserve`;
  }

  update(id: number, updateReserveDto: UpdateReserveDto) {
    return `This action updates a #${id} reserve`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserve`;
  }
}
