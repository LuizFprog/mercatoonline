import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CartGatewayController } from './cart.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [CartGatewayController],
})
export class CartGatewayModule {}
