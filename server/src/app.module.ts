import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './users/common/guards';
import { EventsModule } from './events/events.module';
import { HistoryModule } from './history/history.module';
import { ReserveModule } from './reserve/reserve.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:example@localhost:27017/MyTicket?authSource=admin'),
  UsersModule,
  EventsModule,],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
