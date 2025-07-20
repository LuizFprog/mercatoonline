// cart-service/src/domain/cart-product/entities/cart-product.entity.ts
import { Cart } from './cart.entity';

export class CartProduct {

  id: number;

  cartId: number;
  
  productId: number;
  
  amount: number;

  total: number;
  
  createdAt: Date;
  
  updatedAt: Date;

  cart: Cart;
}