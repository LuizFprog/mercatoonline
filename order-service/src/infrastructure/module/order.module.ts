import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importado aqui
import { CreateOrderService } from 'src/application/use-cases/create.order.service';
import { DeleteOrderService } from 'src/application/use-cases/delete.order.service';
import { FindallorderService } from 'src/application/use-cases/findallorder.service';
import { FindbyidOrderProductService } from 'src/application/use-cases/findbyid.order-product.service';
import { IOrderRepository } from 'src/domain/interface/repository/IOrder';
import { OrderPrismaRepository } from '../database/repository/order.prisma.repository';
import { PrismaModule } from '../../prisma/prisma-module/prisma.module';
import { OrderController } from 'src/interface/controller/order.controller';

@Module({
    imports: [
        PrismaModule,
        HttpModule, // Adicionado para permitir a comunicação HTTP
    ],
    controllers: [OrderController],
    providers: [
        {
            provide: 'IOrderRepository', // Use a string token for the interface
            useClass: OrderPrismaRepository,
        },
        CreateOrderService,
        DeleteOrderService,
        FindallorderService,
        FindbyidOrderProductService,
    ],
})
export class OrderModule {}