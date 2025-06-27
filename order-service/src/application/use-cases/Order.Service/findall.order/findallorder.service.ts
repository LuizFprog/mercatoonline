import { Injectable } from '@nestjs/common';
import { OrderPrismaRepository } from 'src/infrastructure/database/repository/order.prisma.repository'

@Injectable()
export class FindallorderService {

    constructor(private readonly orderRepository: OrderPrismaRepository) {}

    execute() {
        return this.orderRepository.findall();
    }
}
