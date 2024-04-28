import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose"

@Schema()
export class Event{

    @Prop()
    event_name:string

    @Prop()
    event_description:string

    @Prop()
    event_image:string

    @Prop()
    rating:string

    @Prop()
    venue_id:string

}

export const EventSchema = SchemaFactory.createForClass(Event)