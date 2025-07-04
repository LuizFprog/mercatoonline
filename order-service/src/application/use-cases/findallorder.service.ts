import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';

@Injectable()
export class FindallorderService {
    constructor(
        @Inject('IOrderRepository') 
        private readonly orderRepository: IOrderRepository
    ) {}

    async execute() {
        return this.orderRepository.findall();
    }
}