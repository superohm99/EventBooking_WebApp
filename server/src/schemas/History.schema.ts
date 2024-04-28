import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
import mongoose from "mongoose"
import { Document } from "typeorm";

@Schema()
export class History{

    @Prop({type: mongoose.Schema.Types.ObjectId})
    reserve_id:string;

    @Prop({ required: true })
    payment_status:boolean;

    @Prop({ required: true })
    reserve_timestamp:Date;

}

export const HistorySchema = SchemaFactory.createForClass(History)