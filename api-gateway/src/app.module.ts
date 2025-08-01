import { Module } from '@nestjs/common';
import { UsersGatewayModule } from './users/users.gateway.module';
import { ProductsGatewayModule } from './products/products.gateway.module';
import { CategoriesGatewayModule } from './products/categories.gateway.module';
import { StoreGatewayModule } from './stores/stores.gateway.module';
import { OrdersGatewayModule } from './orders/orders.gateway.module';
import { CartGatewayModule } from './cart/cart.gateway.module';
import { AppController } from './app.controller';
import { LocationGatewayModule } from './users/location.gateway.module';
import { AuthGatewayModule } from './users/auth.gateway.module';

@Module({
  imports: [
    UsersGatewayModule,
    ProductsGatewayModule,
    CategoriesGatewayModule,
    OrdersGatewayModule,
    StoreGatewayModule,
    CartGatewayModule, 
    LocationGatewayModule, 
    AuthGatewayModule,
  ],
  controllers: [AppController],
})
export class AppModule {}