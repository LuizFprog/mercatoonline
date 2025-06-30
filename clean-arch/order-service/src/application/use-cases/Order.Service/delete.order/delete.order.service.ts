import { Injectable } from '@nestjs/common';
import { OrderPrismaRepository } from 'src/infrastructure/database/repository/order.prisma.repository'

@Injectable()
export class DeleteOrderService {

    constructor(private readonly orderRepository: OrderPrismaRepository) {}

    execute(orderId: number) {
        return this.orderRepository.delete(orderId);
    }

}
