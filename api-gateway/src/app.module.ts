import { Module } from '@nestjs/common';
import { UsersGatewayModule } from './users/users.gateway.module';
import { ProductsGatewayModule } from './products/products.gateway.module';
import { CategoriesGatewayModule } from './products/categories.gateway.module';
import { StoreGatewayModule } from './stores/stores.gateway.module';
import { OrdersGatewayModule } from './orders/orders.gateway.module';
import { CartGatewayModule } from './cart/cart.gateway.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersGatewayModule,
    ProductsGatewayModule,
    CategoriesGatewayModule,
    OrdersGatewayModule,
    StoreGatewayModule,
    CartGatewayModule, 
  ],
  controllers: [AppController],
})
export class AppModule {}