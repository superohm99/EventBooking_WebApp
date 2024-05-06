import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema()
export class Payment extends Document{
    @Prop()
    reserve_id : string

    @Prop()
    payment_intent_id : string

    @Prop()
    price : number

    @Prop()
    status : string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)