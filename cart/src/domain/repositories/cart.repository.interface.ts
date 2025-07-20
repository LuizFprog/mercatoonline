import { Prisma, Cart } from '@prisma/client';

export const ICartRepository = Symbol('ICartRepository');

export interface ICartRepository {
  findById(id: number): Promise<Cart | null>;
  create(cart: Cart): Promise<Cart>;
  delete(id:number);  
}