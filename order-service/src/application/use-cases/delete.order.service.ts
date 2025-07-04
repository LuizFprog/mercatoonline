import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';

@Injectable()
export class DeleteOrderService {
    constructor(
        @Inject('IOrderRepository') 
        private readonly orderRepository: IOrderRepository) {}

    async execute(orderId: number) {
        // Primeiro, verifica se o pedido existe
        const orderExists = await this.orderRepository.findbyId(orderId);
        if (!orderExists) {
            throw new NotFoundException(`Pedido com ID ${orderId} não encontrado para deletar.`);
        }
        // Se existe, deleta
        await this.orderRepository.delete(orderId);
    }
}