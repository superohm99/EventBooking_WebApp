import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertModule } from './concert/concert.module';
import { UsersModule } from './users/users.module';
import { AtStrategy, RtStrategy } from './users/strategies';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './users/common/guards';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://thanasuksongsriohm:mHayu0SQ390loYQA@myticketdb.vs5a23w.mongodb.net/MyticketDB'),ConcertModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AtGuard,
  }],
})
export class AppModule {}
