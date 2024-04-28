import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// event_name
// event_description
// image
// rating
// venue
// schedules : []

@Schema()
export class Event extends Document {
  @Prop({ required: true})
  event_name: string;

  @Prop({ required: true})
  event_description: string;

  @Prop({ required: true})
  image: string;

  @Prop({ required: true})
  rating: number;

  @Prop({ type: Types.ObjectId, ref: 'Venue', required: true})
  venue: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'EventSchedule' }]})
  schedules: string[];


}

export const EventSchema = SchemaFactory.createForClass(Event);