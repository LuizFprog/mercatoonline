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
  findCartProductById(cartProductId: number): Promise<CartProduct | null>;
  findAllCart(): Promise<Cart[]>;
  findByUserId(userId: number): Promise<(Cart & { cartProducts: CartProduct[] }) | null>;
  delete(id: number): Promise<Cart>;
  addProduct(data: AddProductData): Promise<Cart>;
  updateProductAmount(cartProductId: number, amount: number, total: number): Promise<CartProduct>;
  removeProduct(cartProductId: number): Promise<void>;
  updateStatus(cartId: number, status: string): Promise<Cart>;
  findActiveByUserId(userId: number): Promise<(Cart & { cartProducts: CartProduct[] }) | null>;
}
