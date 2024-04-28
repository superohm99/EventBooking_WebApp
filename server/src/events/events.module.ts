import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchedule, EventScheduleSchema } from 'src/schemas/Event_schedule.schema';
import { Event, EventSchema } from 'src/schemas/Event.schema';
import { Venue, VenueSchema } from 'src/schemas/Venue.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
    {
        name: EventSchedule.name,
        schema: EventScheduleSchema
    },
    {
        name: Event.name,
        schema: EventSchema,
    },
    {
      name: Venue.name,
      schema: VenueSchema,
    }
]),],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
