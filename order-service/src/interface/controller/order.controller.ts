import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateOrderUseCase } from 'src/application/use-cases/create.order.service';
import { FindOrderByIdUseCase } from 'src/application/use-cases/findbyid.order-product.service';
import { DeleteOrderByIdUseCase } from 'src/application/use-cases/delete.order.service';
import { FindOrderAllOrder } from 'src/application/use-cases/findAll.order-product.service';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly deleteOrderByIdUseCase: DeleteOrderByIdUseCase,
    private readonly findOrderAllOrder: FindOrderAllOrder,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.findOrderByIdUseCase.execute(id);
  }

  @Get()
  findAll() {
    return this.findOrderAllOrder.execute();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteOrderByIdUseCase.execute(id);
  }
}
