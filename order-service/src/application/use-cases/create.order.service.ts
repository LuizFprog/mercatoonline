import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from 'src/interface/dtos/create-order.dto';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateOrderService {
    private readonly userServiceUrl = 'http://user-service:3000/users';
    private readonly productServiceUrl = 'http://product-service:3000/products';

    constructor(
        @Inject('IOrderRepository') 
        private readonly orderRepository: IOrderRepository,
        private readonly httpService: HttpService,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
    ) {}

    async execute(createOrderDto: CreateOrderDto) {
        const { userId, addressId, paymentId, orderProducts } = createOrderDto;

        if (!orderProducts || orderProducts.length === 0) {
            throw new Error('O pedido precisa ter ao menos um produto.');
        }

        await this.findUserById(userId);

        let finalPrice = 0;
        const productsToCreate: { productId: number; amount: number; price: number }[] = [];

        for (const orderProduct of orderProducts) {
            const product = await this.findProductById(orderProduct.productId);
            finalPrice += product.price * orderProduct.amount;
            productsToCreate.push({
                productId: product.id,
                amount: orderProduct.amount,
                price: product.price,
            });
        }
        
         const createnewOrderDto: CreateOrderDto = {
             userId,
             addressId,
             paymentId,
             orderProducts: productsToCreate
            };
        const newOrder = await this.orderRepository.create(createnewOrderDto);
        
        this.natsClient.emit('order.created', newOrder);
        console.log(`[Order-Service] Evento 'order.created' publicado para o pedido ID: ${newOrder.id}`);

        return newOrder;
    }

    private async findUserById(id: number) {
        try {
            const { data } = await firstValueFrom(this.httpService.get(`${this.userServiceUrl}/${id}`));
            return data;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
            }
            throw new InternalServerErrorException('Erro ao se comunicar com o serviço de usuários.');
        }
    }

    private async findProductById(id: number) {
        try {
            const { data } = await firstValueFrom(this.httpService.get(`${this.productServiceUrl}/${id}`));
            return data;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
            }
            throw new InternalServerErrorException('Erro ao se comunicar com o serviço de produtos.');
        }
    }
}