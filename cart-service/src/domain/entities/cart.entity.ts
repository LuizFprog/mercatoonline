// cart-service/src/domain/cart/entities/cart.entity.ts
import { CartProduct } from './cart-product.entity';

export class Cart {
  
  id: number;

  userId: number; // Referência ao User, mas sem foreign key direta no microsserviço

  createdAt: Date;

  updatedAt: Date;

  cartProducts: CartProduct[];
}