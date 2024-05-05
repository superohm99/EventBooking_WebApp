import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schema';
import { Ticket } from './Ticket.schema';
import mongoose from 'mongoose';
@Schema()
export class Reserve {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  users: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' })
  tickets: Ticket;
}

export const ReserveSchema = SchemaFactory.createForClass(Reserve);