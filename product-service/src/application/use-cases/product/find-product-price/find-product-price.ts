import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'
import { priceDTO } from 'src/interfaces/dtos/price.DTO/price.DTO'

@Injectable()
export class FindProductPriceService {

    constructor(
                @Inject(IProductRepository)
                private readonly productPrisma: IProductRepository,
              ) {}

    execute(price:priceDTO){
        return this.productPrisma.findByPriceRange(price)
    }
}
