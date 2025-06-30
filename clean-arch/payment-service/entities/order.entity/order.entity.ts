// order-service/src/domain/order/entities/order.entity.ts
import { Payment } from '../payment.entity/payment.entity';
import { OrderProduct } from '../order-product.entity/order-product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

// "order" é uma palavra reservada no SQL, então o nome da entidade precisa de aspas.
// O TypeORM cuida disso quando você especifica o nome no @Entity().
@Entity({ name: 'orders' }) 
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'address_id' })
  addressId: number;

  @Column({ type: 'timestamp with time zone' })
  date: Date;
  
  @Column({ name: 'payment_id' })
  paymentId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}