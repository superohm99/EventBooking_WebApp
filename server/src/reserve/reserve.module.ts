import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchedule, EventScheduleSchema } from 'src/schemas/Event_schedule.schema';
import { EventSchema } from 'src/schemas/Event.schema';
import { Venue, VenueSchema } from 'src/schemas/Venue.schema';
import { Seat, SeatSchema } from 'src/schemas/Seat.schema';
import { Ticket, TicketSchema } from 'src/schemas/Ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventSchedule.name,
        schema: EventScheduleSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
      {
        name: Seat.name,
        schema: SeatSchema,
      },
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
  ],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
