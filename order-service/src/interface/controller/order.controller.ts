import { Controller,Get, Param,Post,Body,Delete,ParseIntPipe } from '@nestjs/common';
import { CreateOrderService } from 'src/application/use-cases/Order.Service/create.order/create.order.service'
import { DeleteOrderService } from 'src/application/use-cases/Order.Service/delete.order/delete.order.service'
import { FindallorderService } from 'src/application/use-cases/Order.Service/findall.order/findallorder.service'
import { FindbyidOrderProductService } from 'src/application/use-cases/Order.Service/findbyid.order/findbyid.order-product.service'
import { CreateOrderDto } from 'src/interface/dtos/create-order.dto';


@Controller('order')
export class OrderController {

    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly deleteOrderService: DeleteOrderService,
        private readonly findallorderService: FindallorderService,
        private readonly findbyidOrderProductService: FindbyidOrderProductService
    ){}


    @Get(':id')
    findById(@Param("id", ParseIntPipe) id:number){
        return this.findbyidOrderProductService.execute(id);
    }

    @Get()
    findAll(){
        return this.findallorderService.execute();
    }
    
    @Post()
    createOrder(@Body() createorderdto:CreateOrderDto){
        return this.createOrderService.execute(createorderdto);
    }

    @Delete(":id")
    DeleteOrder(@Param("id", ParseIntPipe) id: number){
        return this.deleteOrderService.execute(id);

    }
}
