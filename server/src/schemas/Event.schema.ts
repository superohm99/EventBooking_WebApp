import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EventSchedule } from './Event_schedule.schema';
import { Venue } from './Venue.schema';
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId , ref:'Venue'}]})
  venue: Venue;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId , ref:'EventSchedule'}]})
  eventschedules: EventSchedule[];

}

export const EventSchema = SchemaFactory.createForClass(Event);
