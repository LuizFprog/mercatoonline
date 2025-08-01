import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartController } from 'src/interfaces/controllers/cart.controller';
import { CreateCartUseCase } from 'src/application/use-cases/create-cart.service';
import { DeactivateCartUseCase } from 'src/application/use-cases/deactivate-cart.use-case';
import { DeleteCartByIdService } from 'src/application/use-cases/delete-cart.service';
import { FindCartByIdService } from 'src/application/use-cases/find-cart-by-id.service';
import { FindCartAllService } from 'src/application/use-cases/find-cart-all.service';
import { AddProductToCartUseCase } from 'src/application/use-cases/add-product-to-cart.use-case';
import { CartEventsController } from 'src/interfaces/controllers/cart-events.controller';
import { ICartRepository } from 'src/domain/repositories/cart.repository.interface';
import { CartPrismaRepository } from 'src/infrastructure/database/repositories/cart-prisma.repository.service';
import { RemoveProductFromCartUseCase } from 'src/application/use-cases/remove-produtct-to-cart';
import { UpdateProductInCartUseCase} from 'src/application/use-cases/update-produtct-to-cart';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats_server:4222'],
        },
      },
    ]),
  ],
  controllers: [CartController, CartEventsController],
  providers: [
    CreateCartUseCase,
    DeleteCartByIdService,
    FindCartByIdService,
    AddProductToCartUseCase,
    FindCartAllService,
    DeactivateCartUseCase, 
    RemoveProductFromCartUseCase,
    UpdateProductInCartUseCase,
    {
      provide: ICartRepository,
      useClass: CartPrismaRepository,
    },
  ],
})
export class CartsModule {}