import { Injectable,Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository'
import { CreateCategoryDto } from 'src/interfaces/dtos/create.category/create.category'

@Injectable()
export class CreateCategoryProduct{
    constructor(
        @Inject(ICategoryRepository)
        private readonly categorPrisma: ICategoryRepository,
      ) {}
    
    
    execute(data:CreateCategoryDto){
        return this.categorPrisma.create(data)
    }
}