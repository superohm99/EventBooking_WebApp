import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSeatDto } from './dto/create-seat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Seat } from 'src/schemas/Seat.schema';
import { Ticket } from 'src/schemas/Ticket.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Seat.name) private seatModel: Model<Seat>,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>
  ) {}

  async createSeat(id: string, createSeatDto: CreateSeatDto): Promise<Seat> {
    const seat = new this.seatModel(createSeatDto);
    const seat_result = await seat.save();
    const ticket = new this.ticketModel({"events": id, "seats": [seat_result]});
    await ticket.save();
    console.log(ticket);
    return seat_result;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }
}
