import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindProductCatagoryService {

    constructor(
                @Inject(IProductRepository)
                private readonly categoryPrisma: IProductRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}
    
    async execute(id:number){
        const categoryId = await this.categoryPrisma.findByCategoryId(id)
        if(!categoryId){
            throw new Error(`Category with ID ${id} not found`);
        }
        
        return categoryId;
    }
}
