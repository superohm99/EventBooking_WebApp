import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Venue {
 
  @Prop()
  name: string

  @Prop()
  location: string;

  @Prop()
  capacity: number;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
