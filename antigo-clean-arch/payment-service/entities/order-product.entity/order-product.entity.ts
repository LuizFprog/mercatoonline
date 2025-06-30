import { Order } from '../order.entity/order.entity';
export class OrderProduct {
  
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number; // Preço do produto no momento da compra
  createdAt: Date;
  updatedAt: Date;
  order: Order;
}