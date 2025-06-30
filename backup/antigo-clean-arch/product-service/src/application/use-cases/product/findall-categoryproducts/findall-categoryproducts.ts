import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'

@Injectable()
export class FindAllProductCatagoryService {

    constructor(
                @Inject(IProductRepository)
                private readonly categoryPrisma: IProductRepository,
              ) {}
    
    execute(){
        return this.categoryPrisma.findAllCategory()
    }
}
