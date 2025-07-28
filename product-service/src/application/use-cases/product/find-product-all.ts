import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindProductAllService {

    constructor(
        @Inject(IProductRepository) 
        private readonly productPrisma: IProductRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
              ) {}
    
    async execute(){
        const products = await this.productPrisma.findAll();
        if(products.length === 0){
            return [];
        }
        return products;
    }
}
