import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrdersGatewayController } from './orders.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [OrdersGatewayController],
})
export class OrdersGatewayModule {}