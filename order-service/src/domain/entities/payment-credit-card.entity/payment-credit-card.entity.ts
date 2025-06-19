// order-service/src/domain/payment/entities/payment-credit-card.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'payment_credit_cards' })
export class PaymentCreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  installments: number;
}