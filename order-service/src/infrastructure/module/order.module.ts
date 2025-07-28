import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateOrderUseCase } from 'src/application/use-cases/create.order.service';
import { DeleteOrderByIdUseCase } from 'src/application/use-cases/delete.order.service';
import { FindOrderByIdUseCase } from 'src/application/use-cases/findbyid.order-product.service';
import { FindOrderAllOrder} from 'src/application/use-cases/findAll.order-product.service';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';
import { OrderPrismaRepository } from '../database/repository/order.prisma.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderController } from 'src/interface/controller/order.controller';

@Module({
    imports: [
    PrismaModule,
    HttpModule,
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats_server:4222'],
        },
      },
    ]),
  ],
    controllers: [OrderController],
    providers: [
        {
            provide: IOrderRepository,
            useClass: OrderPrismaRepository,
        },
        CreateOrderUseCase,
        DeleteOrderByIdUseCase,
        FindOrderByIdUseCase,
        FindOrderAllOrder,
    ],
})
export class OrderModule {}