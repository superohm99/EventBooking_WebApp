import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EventSchedule } from './Event_schedule.schema';
import { Venue } from './Venue.schema';
import { Seat } from './Seat.schema';
@Schema()
export class Event {
  @Prop()
  event_name: string;

  @Prop()
  event_description: string;

  @Prop()
  event_image: string;

  @Prop()
  rating: string

  @Prop()
  image:string

  @Prop({ type: mongoose.Schema.Types.ObjectId , ref:'Venue'})
  venue: Venue;

  @Prop([{ type: Object , ref:'EventSchedule'}])
  eventschedules: EventSchedule[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId , ref:'Seat'}])
  seats: Seat[];

}

export const EventSchema = SchemaFactory.createForClass(Event);
