import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';

@Injectable()
export class DeleteOrderByIdUseCase {
  constructor(
    @Inject(IOrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    // CORREÇÃO: Usa 'findById' com 'B' maiúsculo
    const orderExists = await this.orderRepository.findById(id);
    if (!orderExists) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }
    await this.orderRepository.delete(id);
    return { message: 'Pedido deletado com êxito' };
  }
}