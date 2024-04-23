import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertModule } from './concert/concert.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://teeruth2546:7mawijIAr3yW510N@ruth.jtq6v9f.mongodb.net/'),ConcertModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
