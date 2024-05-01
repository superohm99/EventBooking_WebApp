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
  imports: [MongooseModule.forRoot('mongodb+srv://teeruth2546:7mawijIAr3yW510N@ruth.jtq6v9f.mongodb.net/'), UsersModule, EventsModule, HistoryModule,ReserveModule],
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
