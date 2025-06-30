import { Injectable,Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository'

@Injectable()
export class FindAllProductCatagoryService {

    constructor(
                @Inject(ICategoryRepository)
                private readonly categoryPrisma: ICategoryRepository,
              ) {}
    
    execute(){
        return this.categoryPrisma.findAllCategory()
    }
}
