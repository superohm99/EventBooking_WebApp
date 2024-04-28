import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// FK: event_id
// start_date
// end_date
// start_time
// end_time

@Schema()
export class EventSchedule extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Event', required: true})
    event_id: string;
    
    @Prop({ required: true})
    start_date: Date;
    
    @Prop({ required: true})
    end_date: Date;
    
    @Prop({ required: true})
    start_time: Date;
    
    @Prop({ required: true})
    end_time: Date;

}

export const EventScheduleSchema = SchemaFactory.createForClass(EventSchedule);