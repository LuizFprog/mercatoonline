import { IProductRepository } from 'src/domain/repository/product.repository.interface';
import { CreateProductDto } from 'src/interfaces/dtos/create.products/create.products';
export declare class CreateProductService {
    private readonly productPrisma;
    constructor(productPrisma: IProductRepository);
    execute(data: CreateProductDto): any;
}
