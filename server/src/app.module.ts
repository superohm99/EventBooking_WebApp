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
  imports: [MongooseModule.forRoot('mongodb+srv://thanasuksongsriohm:IV3OE0pdQVwKVSbB@myticketdb.vs5a23w.mongodb.net/'), UsersModule, EventsModule, HistoryModule, ReserveModule,],
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
