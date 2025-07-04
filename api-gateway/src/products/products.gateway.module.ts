import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsGatewayController } from './products.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductsGatewayController],
})
export class ProductsGatewayModule {}