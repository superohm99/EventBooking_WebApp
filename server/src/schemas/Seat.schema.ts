import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Seat {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  section: string;

  @Prop({ required: true })
  row: string;

  @Prop({ required: true })
  seat_num: string;

  @Prop({ required: true })
  price: number;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
