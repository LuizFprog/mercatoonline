import { Module } from '@nestjs/common';
import { UsersGatewayModule } from './users/users.gateway.module';
import { ProductsGatewayModule } from './products/products.gateway.module';
import { CategoriesGatewayModule } from './products/categories.gateway.module';
import { OrdersGatewayModule } from './orders/orders.gateway.module';

@Module({
  imports: [
    UsersGatewayModule,
    ProductsGatewayModule,
    CategoriesGatewayModule,
    OrdersGatewayModule,
  ],
})
export class AppModule {}