// order-service/src/domain/payment/entities/payment-pix.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'payment_pix' })
export class PaymentPix {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ name: 'date_payment', type: 'timestamp with time zone', nullable: true })
  datePayment: Date;
}