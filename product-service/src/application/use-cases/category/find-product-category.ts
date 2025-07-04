import { Injectable,Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindProductCatagoryService {

    constructor(
                @Inject(ICategoryRepository)
                private readonly categoryPrisma: ICategoryRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}
    
    async execute(id:number){

        const categoryId = await this.categoryPrisma.findByCategory(id)

        if(!categoryId){
            throw new Error(`Category with ID ${id} not found`);
        }
        return categoryId;
    }
}
