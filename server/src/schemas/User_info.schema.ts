import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

@Schema()
export class User_info {
  @Prop({ required: true })
  date_of_birth: Date;

  @Prop({ required: true })
  id_card: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  phone_no: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  district: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  users: User;
}

export const User_infoSchema = SchemaFactory.createForClass(User_info);
