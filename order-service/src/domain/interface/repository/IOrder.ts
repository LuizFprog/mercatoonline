import { Order, Prisma } from '@prisma/client';

export const IOrderRepository = Symbol('IOrderRepository');

export interface IOrderRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  delete(id: number): Promise<Order>;
}