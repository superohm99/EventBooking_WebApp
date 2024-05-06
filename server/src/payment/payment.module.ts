import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/schemas/Payment.schema';
import { ReserveModule } from 'src/reserve/reserve.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    ReserveModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
