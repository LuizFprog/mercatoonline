import { Module } from '@nestjs/common';
import { AppController } from '../interfaces/app.controller';
import { AppService } from '../application/app.service';
import { CreateCartService } from '../application/use-cases/create-cart/create-cart.service';
import { FindCartByIdService } from '../application/use-cases/find-cart-by-id/find-cart-by-id.service';
import { UsersController } from '../interfaces/controllers/carts/cart.controller';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { CartsModule } from './carts.module/carts.module';

@Module({
  imports: [DatabaseModule, CartsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, CreateCartService, FindCartByIdService],
})
export class AppModule {}
