import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';

@Injectable()
export class FindOrderAllOrder {
  constructor(
    @Inject(IOrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}

  async execute() {
    const order = await this.orderRepository.findAll();
    if (!order) {
      throw new NotFoundException(`Lista de pedidos vazia.`);
    }
    return order;
  }
}