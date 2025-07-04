import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UpdateProductService {

    constructor(
                @Inject(IProductRepository)
                private readonly productPrisma: IProductRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}

    async execute(id: number, data: UpdateProductsDTO){

        console.log(data+' '+id)

        const idExists = await this.productPrisma.findById(id);
        if(!idExists){
            throw new Error(`Product with ID ${id} not found`);
        }   
        return await this.productPrisma.update(id,data)
    }
}
