import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products/update.products'

@Injectable()
export class UpdateProductService {

    constructor(
                @Inject(IProductRepository)
                private readonly productPrisma: IProductRepository,
              ) {}

    execute(id:number,data:UpdateProductsDTO){
        return this.productPrisma.update(id,data)
    }
}
