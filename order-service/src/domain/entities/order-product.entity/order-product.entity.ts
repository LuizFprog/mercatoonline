import { Order } from '../order.entity/order.entity';
export class OrderProduct {
  
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number; 
  createdAt: Date;
  updatedAt: Date;
  order: Order;
}