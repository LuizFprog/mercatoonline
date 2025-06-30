import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'

@Injectable()
export class DeleteProductService {

     constructor(
            @Inject(IProductRepository)
            private readonly productPrisma: IProductRepository,
          ) {}

    execute(id:number){
        return this.productPrisma.delete(id)
    }
}
