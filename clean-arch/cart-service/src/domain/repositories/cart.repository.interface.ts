import { Cart } from '../entities/cart.entities/cart.entity';
export interface ICartRepository {
  findById(id: string): Promise<Cart | null>;
  create(cart: Cart): Promise<Cart>;
}