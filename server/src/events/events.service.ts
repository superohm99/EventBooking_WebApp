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

  async createSeat(event_id: string, createSeatDto: CreateSeatDto): Promise<Seat> {
    const newSeat = new this.seatModel(createSeatDto);
    await newSeat.save();

    const ticket = await this.ticketModel.findOneAndUpdate(
      { event: event_id },
      { $push: { seats: newSeat._id } },
      { new: true }
    );

    console.log("ticket", ticket);

    return newSeat;
  }

  async createTicket(event_id: string): Promise<Ticket> {
    const newTicket = new this.ticketModel({ event: event_id, seats: [] });
    await newTicket.save();
    return newTicket;
  }

}
