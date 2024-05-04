import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose";
import { Reserve } from "./Reserve.schema";
import { Payment } from "./Payment.schema";

@Schema()
export class History extends Document{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Reserve'})
    reserve: Reserve

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Payment'})
    payment: Payment
}

export const HistorySchema = SchemaFactory.createForClass(History)