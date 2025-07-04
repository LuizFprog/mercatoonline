import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';

@Injectable()
export class FindbyidOrderProductService {
    constructor(
        @Inject('IOrderRepository') 
        private readonly orderRepository: IOrderRepository) {}

    async execute(orderId: number) {
        const order = await this.orderRepository.findbyId(orderId);
        if (!order) {
            throw new NotFoundException(`Pedido com ID ${orderId} não encontrado.`);
        }
        return order;
    }
}