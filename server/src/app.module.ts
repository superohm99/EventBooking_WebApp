import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertModule } from './concert/concert.module';
import { UsersModule } from './users/users.module';
import { AtStrategy, RtStrategy } from './users/strategies';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './users/common/guards';
import { EventsModule } from './events/events.module';
import { HistoryModule } from './history/history.module';
import { VenueModule } from './venue/venue.module';
import { SeatsModule } from './seats/seats.module';
import { TicketModule } from './ticket/ticket.module';
import { UserInfoModule } from './user_info/user_info.module';
import { ReserveModule } from './reserve/reserve.module';
import { EventScheduleModule } from './event_schedule/event_schedule.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://teeruth2546:7mawijIAr3yW510N@ruth.jtq6v9f.mongodb.net/'),ConcertModule, UsersModule, EventsModule, HistoryModule, VenueModule, SeatsModule, TicketModule, UserInfoModule, ReserveModule, EventScheduleModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AtGuard,
  }],
})
export class AppModule {}
