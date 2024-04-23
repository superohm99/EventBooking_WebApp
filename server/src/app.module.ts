import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertModule } from './concert/concert.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://thanasuksongsriohm:<password>@myticketdb.vs5a23w.mongodb.net/MyticketDB'),ConcertModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
