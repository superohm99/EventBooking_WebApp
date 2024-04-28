import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from 'src/schemas/History.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: History.name,
        schema: HistorySchema,
      },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
