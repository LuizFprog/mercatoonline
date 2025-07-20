import { Injectable,Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma, Cart } from '@prisma/client';
import {ICartRepository } from 'src/domain/repositories/cart.repository.interface'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class CreateCartService {
  constructor(
                 @Inject(ICartRepository)
                  private readonly cartPrisma: ICartRepository,
                  @Inject('NATS_SERVICE')
                  private readonly natsClient: ClientProxy,
                ) {}

  const prisma = new PrismaClient()

  async function createCart(data: {
  userId: number,
  products: { productId: number, amount: number, price: number }[]
}) {
  // 1. Calcula os totais
  const cartProductsData = data.products.map(p => ({
    productId: p.productId,
    amount: p.amount,
    price: p.price,
    total: Number((p.price * p.amount).toFixed(2)),
  }))

  // 2. Cria o carrinho com produtos relacionados
  const cart = await prisma.cart.create({
    data: {
      userId: data.userId,
      cartProducts: {
        create: cartProductsData
      }
    },
    include: {
      cartProducts: true
    }
  })

  return cart
}
}
