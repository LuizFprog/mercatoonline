import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';

@Injectable()
export class OrderPrismaRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
      include: { orderProducts: true }, 
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { orderProducts: true },
    });
  }

  async delete(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
