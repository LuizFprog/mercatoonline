import { Injectable,Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindAllProductCatagoryService {

    constructor(
                @Inject(ICategoryRepository)
                private readonly categoryPrisma: ICategoryRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}
    
    async execute(){
        const categories = await this.categoryPrisma.findAllCategory();
        if(categories.length === 0){
            return [];
        }
        return categories;
    }
}
