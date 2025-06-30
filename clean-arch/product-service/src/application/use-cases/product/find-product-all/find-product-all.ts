import { Injectable,Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository'

@Injectable()
export class FindProductAllService {

    constructor(
        @Inject(IProductRepository) private readonly productPrisma: IProductRepository,
              ) {}
    
    execute(){
        return this.productPrisma.findAll();
    }
}
