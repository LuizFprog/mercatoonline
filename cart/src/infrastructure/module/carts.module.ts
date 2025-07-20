import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateCartService } from 'src/application/use-cases/create-cart.service';
import { DeleteCartByIdService } from 'src/application/use-cases/delete-cart.service';
import { FindCartByIdService } from 'src/application/use-cases/find-cart-by-id.service';
import { ICartRepository} from 'src/domain/repositories/cart.repository.interface';
import { CartPrismaRepositoryService} from '../database/repositories/cart-prisma.repository/cart-prisma.repository.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CartController } from 'src/interfaces/controllers/cart.controller';

@Module({
    
    imports: [
        PrismaModule,
        HttpModule, // Adicionado para permitir a comunicação HTTP
    ],
    controllers: [CartController],
    providers: [
        
        {
            provide: 'ICartRepository', 
            useClass: CartPrismaRepositoryService,
        },
        CreateCartService,
        DeleteCartByIdService,
        FindCartByIdService,
    ],})
export class CartsModule {}
