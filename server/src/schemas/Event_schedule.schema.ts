import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose';
import {Event} from "./Event.schema"

@Schema()
export class EventSchedule {
    @Prop({required : false})
    start_date: Date;

    @Prop({required : false})
    end_date: Date;

    @Prop({required : false})
    start_time: Date;

    @Prop({required : false})
    end_time: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId , ref:'Event'}]})
    events: Event[];
}

export const EventScheduleSchema = 
SchemaFactory.createForClass(EventSchedule)