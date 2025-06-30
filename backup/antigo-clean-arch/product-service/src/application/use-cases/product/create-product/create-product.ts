import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { CreateProductDto } from 'src/interfaces/dtos/create.products/create.products'

@Injectable()
export class CreateProductService {

    constructor(
        @Inject(IProductRepository)
        private readonly productPrisma: IProductRepository,
      ) {}
    
    
    execute(data:CreateProductDto){
        return this.productPrisma.create(data)
    }
}
