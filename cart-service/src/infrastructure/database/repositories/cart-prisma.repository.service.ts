import { Injectable } from '@nestjs/common';
import { Cart, CartProduct, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICartRepository, AddProductData } from 'src/domain/repositories/cart.repository.interface';

@Injectable()
export class CartPrismaRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({ data });
  }

  async findById(id: number): Promise<(Cart & { cartProducts: CartProduct[] }) | null> {
    return this.prisma.cart.findUnique({
      where: { id },
      include: { cartProducts: true },
    });
  }

  async findByUserId(userId: number): Promise<(Cart & { cartProducts: CartProduct[] }) | null> {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { cartProducts: true },
    });
  }

  async delete(id: number): Promise<Cart> {
    return this.prisma.cart.delete({ where: { id } });
  }

  async addProduct(data: AddProductData): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id: data.cartId },
      data: {
        cartProducts: {
          create: {
            productId: data.productId,
            productName: data.productName,
            amount: data.amount,
            price: data.price,
            total: data.total,
          },
        },
      },
      include: { cartProducts: true },
    });
  }

  async findAllCart(): Promise<Cart[]> {
    return this.prisma.cart.findMany({
      include: { cartProducts: true },
    });
  }
}
