import { Injectable,Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository'

@Injectable()
export class FindProductCatagoryService {

    constructor(
                @Inject(ICategoryRepository)
                private readonly categoryPrisma: ICategoryRepository,
              ) {}
    
    execute(id:number){
        return this.categoryPrisma.findByCategory(id)
    }
}
