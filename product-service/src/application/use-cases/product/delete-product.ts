import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DeleteProductService {

     constructor(
            @Inject(IProductRepository)
            private readonly productPrisma: IProductRepository,
            @Inject('NATS_SERVICE')
            private readonly natsClient: ClientProxy,
          ) {}

    async execute(id:number){

        const product = await this.productPrisma.findById(id);
        if(!product){
            throw new Error(`Product with ID ${id} not found`);
        }   
        await this.productPrisma.delete(id);
    };
}
