import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Stripe } from 'stripe';
import * as dotenv from 'dotenv';
import { Payment } from 'src/schemas/Payment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
dotenv.config();

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;

  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SKEY, {
      apiVersion: '2024-04-10',
      typescript: true,
    });
  }

  getConfig() {
    return {
      publishableKey: process.env.STRIPE_PKEY,
    };
  }

  async createPaymentIntent(reserve_id: string, createPaymentDto: CreatePaymentDto) : Promise<any> {
    console.log('createPaymentDto', createPaymentDto);
    console.log('reserve_id', reserve_id);
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: createPaymentDto.amount * 100,
      currency: 'thb',
      metadata: {
        order_id: reserve_id,
      },
    });

    console.log('paymentIntent', paymentIntent);

    const createdPayment = new this.paymentModel({
      reserve_id,
      payment_intent_id: paymentIntent.id,
      price: createPaymentDto.amount,
      status: paymentIntent.status,
    });

    await createdPayment.save();

    console.log('createdPayment', createdPayment);

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntendId: paymentIntent.id,
    };
  }

  async setPaymentStatus(reserve_id: string, status: string, paymentIntentId: string) {
    console.log('reserve_id', reserve_id);
    console.log('paymentIntentId', paymentIntentId);
    console.log('status', status);
    const payment = await this.paymentModel.findOneAndUpdate(
      { payment_intent_id: paymentIntentId },
      { status },
      { new: true },
    );
    console.log('payment-update', payment);
    return payment;
  }

}
