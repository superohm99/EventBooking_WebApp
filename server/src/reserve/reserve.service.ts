import { Injectable } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from 'src/schemas/Event.schema';
import { EventSchedule } from 'src/schemas/Event_schedule.schema';
import { Venue } from 'src/schemas/Venue.schema';
import { Ticket } from 'src/schemas/Ticket.schema';
import { Seat } from 'src/schemas/Seat.schema';
import { Model, Types } from 'mongoose';
import { jwtDecode } from 'jwt-decode';
import { User } from 'src/schemas/User.schema';
import { Reserve } from 'src/schemas/Reserve.schema';
const { ObjectId } = require('mongodb');

@Injectable()
export class ReserveService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Seat.name) private seatModel: Model<Seat>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(EventSchedule.name) private eventScheduleModel: Model<EventSchedule>,
    @InjectModel(Venue.name) private venue: Model<Venue>,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    @InjectModel(Reserve.name) private reserveModel: Model<Reserve>
  ) { }
  
  async getdata_reserve(id:string){
    let lst_resp = []
    const event = await this.eventModel.findOne({_id:id});
    const venue = await this.venue.findOne({_id:event.venue})
    const seat =await this.seatModel.find({_id:event.seats}).exec()
    
    lst_resp.push(event)
    lst_resp.push(venue)
    lst_resp.push(seat)
    return lst_resp
  }

  async create_reserve(createReserveDto: CreateReserveDto) {
 
    const decode = jwtDecode(createReserveDto.authorization.split(" ")[1]);
  
    const user = await this.userModel.findOne({_id:decode.sub}).exec();
  
    const new_ticket = new this.ticketModel({
      event: new Types.ObjectId(createReserveDto.eventid)
    })

    const seatID =new Types.ObjectId(createReserveDto.seatid)
    const seat_obj = await this.seatModel.findById(seatID)
    new_ticket.seats.push(seat_obj._id)
    new_ticket.save()

    const new_reserve = new this.reserveModel({
      users: decode.sub,
      tickets: new_ticket,
      status:true
    })
    return true;
  }
  
}
