import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Event } from './Event.schema';
import { Seat } from './Seat.schema';
import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Event'})
  event: Event;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }] })
  seats: Seat[];

  @Prop()
  status: boolean
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
