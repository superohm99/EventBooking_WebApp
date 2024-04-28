import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
import { Event } from "./Event.schema"
import { Seat } from "./Seat.schema"
import mongoose from "mongoose"
@Schema()
export class Ticket{

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId , ref:'Event'}]})
    events: Event

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId , ref:'Seat'}]})
    seats: Seat[]

}

export const TicketSchema = SchemaFactory.createForClass(Ticket)