import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { priceDTO } from 'src/interfaces/dtos/price.DTO'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindProductPriceService {

    constructor(
                @Inject(IProductRepository)
                private readonly productPrisma: IProductRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}

    async execute(price:priceDTO){

        if(!price.price1 && !price.price2){
            throw new Error('Both min and max price are required to find products by price range');
        }
        return await this.productPrisma.findByPriceRange(price)
    }
}
