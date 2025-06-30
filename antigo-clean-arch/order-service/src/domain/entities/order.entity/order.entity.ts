import { OrderProduct } from '../order-product.entity/order-product.entity';

export class Order {
  id: number;
  userId: number;
  addressId: number;
  date: Date;
  paymentId?: number;
  createdAt: Date;
  updatedAt: Date;
  orderProducts: OrderProduct[];
}