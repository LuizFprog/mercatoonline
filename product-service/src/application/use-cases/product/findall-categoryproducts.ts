import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindAllProductCatagoryService {

    constructor(
                @Inject(IProductRepository)
                private readonly categoryPrisma: IProductRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}
    
    async execute(){
        const categoriesList = await this.categoryPrisma.findAllCategory();
        if(categoriesList.length === 0){
            return [];
        }
        return categoriesList;
    }
}
