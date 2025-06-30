import { Status } from '../status.entity/status.entity';
import { PaymentCreditCard } from '../payment-credit-card.entity/payment-credit-card.entity';
import { PaymentPix } from '../payment-pix.entity/payment-pix.entity';

export class Payment {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  paymentPixId: number;
  paymentCreditCardId: number;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  paymentPix: PaymentPix;
  paymentCreditCard: PaymentCreditCard;
}