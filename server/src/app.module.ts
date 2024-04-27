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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/htc3p?authSource=admin'
    ),
    ConcertModule,
    UsersModule,
    EventsModule,
  ],
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
