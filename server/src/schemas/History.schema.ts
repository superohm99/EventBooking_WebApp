import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
import mongoose from "mongoose"
import { Reserve } from "./Reserve.schema";

@Schema()
export class History{

    @Prop({ required: true , default:false})
    payment_status:boolean;
    
    @Prop({ required: true })
    reserve_timestamp:Date;
    
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:"Reserve"})
    reserve:Reserve;
}

export const HistorySchema = SchemaFactory.createForClass(History)