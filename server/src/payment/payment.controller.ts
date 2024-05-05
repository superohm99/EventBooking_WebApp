import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Public } from 'src/users/common/decorators/src/common/decorators';

@Public()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('config')
  getConfig() {
    return this.paymentService.getConfig();
  }
  @Post(':id/create-payment-intent')
  create(@Param('id') reserve_id: string, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPaymentIntent(reserve_id, createPaymentDto);
  }

  @Patch(':id/update-payment-status')
  update(@Param('id') session_id: string, @Body() { status, paymentIntentId } : { status: string, paymentIntentId: string }) {
    return this.paymentService.setPaymentStatus(session_id, status, paymentIntentId);
  }


}
