import { Cart, CartProduct, Prisma } from '@prisma/client';

export const ICartRepository = Symbol('ICartRepository');

// DTO para adicionar um produto, usado internamente pelo repositório
export interface AddProductData {
  cartId: number;
  productId: number;
  productName: string;
  amount: number;
  price: number;
  total: number;
}

export interface ICartRepository {
  create(data: Prisma.CartCreateInput): Promise<Cart>;
  findById(id: number): Promise<(Cart & { cartProducts: CartProduct[] }) | null>;
  findByUserId(userId: number): Promise<(Cart & { cartProducts: CartProduct[] }) | null>;
  delete(id: number): Promise<Cart>;
  addProduct(data: AddProductData): Promise<Cart>;
}