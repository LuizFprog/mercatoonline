import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'

@Injectable()
export class FindProductCatagoryService {

    constructor(
                @Inject(IProductRepository)
                private readonly categoryPrisma: IProductRepository,
              ) {}
    
    execute(id:number){
        return this.categoryPrisma.findByCategoryId(id)
    }
}
