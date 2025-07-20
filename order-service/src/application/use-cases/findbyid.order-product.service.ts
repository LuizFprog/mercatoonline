import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(
    @Inject(IOrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: number) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }
    return order;
  }
}