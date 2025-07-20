import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from 'src/interface/dtos/create-order.dto';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateOrderUseCase {
    private readonly userServiceUrl = 'http://user-service:3000/users';
    private readonly productServiceUrl = 'http://product-service:3000/products';
    //private readonly paymentServiceUrl = 'http://payment-service:3000/payments';

    constructor(
        @Inject(IOrderRepository) 
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

        //const { paymentstatus } = await firstValueFrom(this.httpService.get(`${this.paymentServiceUrl}/${userId}`));

        /**if (!paymentstatus.ok) throw new Error('Erro!')*/

        const productsToCreate: Prisma.OrderProductCreateWithoutOrderInput[] = [];

        for (const orderProduct of orderProducts) {
            const product = await this.findProductById(orderProduct.productId);
            productsToCreate.push({
                productId: product.id,
                amount: orderProduct.amount,
                price: product.price,
                total: product.price * orderProduct.amount,
            });
        }
        
        const createOrderInput: Prisma.OrderCreateInput = {
            userId,
            addressId,
            paymentId, //paymentstatus atualiza!
            orderProducts: {
                create: productsToCreate,
            },
        };
        
        const newOrder = await this.orderRepository.create(createOrderInput);
        
        this.natsClient.emit('order.created', newOrder);
        console.log(`[Order-Service] Evento 'order.created' publicado para o pedido ID: ${newOrder.id}`);

        return newOrder;
    }

      private async findUserById(id: number): Promise<any> {
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

    private async findProductById(id: number): Promise<any> {
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