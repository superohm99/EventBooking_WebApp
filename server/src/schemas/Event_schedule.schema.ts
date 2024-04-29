import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

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
}

export const EventScheduleSchema = SchemaFactory.createForClass(EventSchedule)