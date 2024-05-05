import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { Req } from '@nestjs/common';
import { stat } from 'fs';

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
  ) {}

  async getReserveData(event_id: string) {
    const event = await this.eventModel.findOne(new Types.ObjectId(event_id))
    .populate('seats')
    .populate('venue')
    .populate('eventschedules')
    .exec();
    return event;
  }

  async create_reserve(event_id: string, createReserveDto: CreateReserveDto, @Req() req) {
    
    const authToken = req.headers.authorization;
    if (!authToken) {
      return {message:"Unauthorized"}
    }

    const decode = jwtDecode(authToken.split(' ')[1]);

    if(!decode){
      return {message:"Unauthorized"}
    }
  
    const user = await this.userModel.findOne({_id:decode.sub}).exec();

    if(!user){
      return {message:"User not found"}
    }
  
    const new_ticket = new this.ticketModel({
      event: new Types.ObjectId(event_id),
      status:false
    })

    const seatID =new Types.ObjectId(createReserveDto.seat_id)
    const seat_obj = await this.seatModel.findById(seatID)
    new_ticket.seats.push(seat_obj._id)
    new_ticket.save()

    console.log("new ticket", new_ticket)

    const new_reserve = new this.reserveModel({
      users: new Types.ObjectId(decode.sub),
      tickets: new_ticket._id
    })

    await new_reserve.save()

    console.log("new reserve", new_reserve)

    return {reserveId: new_reserve._id}
  }

  async updateTicket(reserve_id: string, updateReserveDto: UpdateReserveDto) {
    const reserve = await this.reserveModel.findById(new Types.ObjectId(reserve_id)).exec();
    console.log("reserve", reserve)
    if(!reserve){
      throw new NotFoundException('Reserve not found');
    }
    console.log("ticket id", reserve.tickets)
    const ticket = await this.ticketModel.findByIdAndUpdate(reserve.tickets, updateReserveDto).exec();
    console.log("ticket", ticket)
    return ticket;
  }

  async get_reserve_by_id(reserveId: string) {
    const reserve = await this.reserveModel.findById(new Types.ObjectId(reserveId))
    const ticket = await this.ticketModel.findById(reserve.tickets)
    .populate('seats')
    .populate('event')
    .exec();
    const event = await this.eventModel.findById(ticket.event).populate('venue').populate('eventschedules').exec();
    const data = {
        event_name: ticket.event.event_name,
        event_description: ticket.event.event_description,
        image: ticket.event.image,
        venue: {
          name: event.venue.name,
          location: event.venue.location,
        },
        event_schedule: {
          start_date: event.eventschedules[0].start_date,
          end_date: event.eventschedules[0].end_date,
          start_time: event.eventschedules[0].start_time,
          end_time: event.eventschedules[0].end_time
        },
        seat: ticket.seats[0],
    }
    return data;
  }

  async getReserveByUser(@Req() req) {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new NotFoundException('User not found');
    }

    const decode = jwtDecode(authToken.split(' ')[1]);

    if(!decode){
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.userModel.findOne({_id:decode.sub}).exec();

    if(!user){
      throw new NotFoundException('User not found');
    }

    const reserve = await this.reserveModel.find({users: new Types.ObjectId(decode.sub)}).populate('tickets').exec();

    if(!reserve){
      throw new NotFoundException('Reserve not found');
    }

    const reserveIdList = reserve.map(reserveItem => ({ reserveId: reserveItem._id }));

    let dataList = []

    const tickets_id = reserve.map(reserve => reserve.tickets)

    for(const ticket_id of tickets_id){
      const ticket = await this.ticketModel.findById(ticket_id).populate('seats').populate('event').exec();
      const event = await this.eventModel.findById(ticket.event).populate('venue').populate('eventschedules').exec();
      const data = {
        event_name: ticket.event.event_name,
        event_description: ticket.event.event_description,
        image: ticket.event.image,
        venue: {
          name: event.venue.name,
          location: event.venue.location,
        },
        event_schedule: {
          start_date: event.eventschedules[0].start_date,
          end_date: event.eventschedules[0].end_date,
          start_time: event.eventschedules[0].start_time,
          end_time: event.eventschedules[0].end_time
        },
        seat: ticket.seats[0],
        status: ticket.status
      }
      dataList.push(data)
    }


    dataList = dataList.map((data, index) => ({...data, reserveId: reserveIdList[index].reserveId}))

    const userData = await this.userModel.findById(new Types.ObjectId(decode.sub)).exec();

    return {history: dataList, user: {username: userData.username, email: userData.email}}
  }
  
}
