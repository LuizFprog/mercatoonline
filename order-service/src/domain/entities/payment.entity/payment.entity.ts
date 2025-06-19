// order-service/src/domain/payment/entities/payment.entity.ts
import { Status } from '../status.entity/status.entity';
import { PaymentCreditCard } from '../payment-credit-card.entity/payment-credit-card.entity';
import { PaymentPix } from '../payment-pix.entity/payment-pix.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'status_id' })
  statusId: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'double precision' })
  discount: number;

  @Column({ name: 'final_price', type: 'double precision' })
  finalPrice: number;

  @Column({ name: 'payment_pix_id', nullable: true })
  paymentPixId: number;

  @Column({ name: 'payment_credit_card_id', nullable: true })
  paymentCreditCardId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToOne(() => PaymentPix)
  @JoinColumn({ name: 'payment_pix_id' })
  paymentPix: PaymentPix;

  @OneToOne(() => PaymentCreditCard)
  @JoinColumn({ name: 'payment_credit_card_id' })
  paymentCreditCard: PaymentCreditCard;
}