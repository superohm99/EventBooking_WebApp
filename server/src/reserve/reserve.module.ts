import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
