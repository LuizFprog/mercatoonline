import { Module } from '@nestjs/common';
import {CreateOrderService} from 'src/application/use-cases/Order.Service/create.order/create.order.service'
import {DeleteOrderService} from 'src/application/use-cases/Order.Service/delete.order/delete.order.service'
import {FindallorderService} from 'src/application/use-cases/Order.Service/findall.order/findallorder.service'
import {FindbyidOrderProductService} from 'src/application/use-cases/Order.Service/findbyid.order/findbyid.order-product.service'
import { IOrderProductService } from 'src/domain/interface/repository/IOrder';
import { OrderPrismaRepository } from '../database/repository/order.prisma.repository';
import { PrismaModule } from '../prisma/prisma-module/prisma.module';
import { OrderController } from 'src/interface/controller/order.controller';

@Module({    
    imports:[PrismaModule],
    controllers:[OrderController],
    providers:[
        OrderPrismaRepository,
        {
            provide:IOrderProductService,
            useClass: OrderPrismaRepository
        },
        CreateOrderService,
        DeleteOrderService,
        FindallorderService,
        FindbyidOrderProductService
    ]
})
export class OrderModule {}