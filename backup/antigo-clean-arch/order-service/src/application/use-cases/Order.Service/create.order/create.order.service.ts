import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/interface/dtos/create-order.dto';
import { OrderPrismaRepository } from 'src/infrastructure/database/repository/order.prisma.repository'

@Injectable()
export class CreateOrderService { 

    constructor(private readonly orderRepository: OrderPrismaRepository) {}

    execute(createOrderDto: CreateOrderDto) {
        return this.orderRepository.create(createOrderDto);
    }
}
