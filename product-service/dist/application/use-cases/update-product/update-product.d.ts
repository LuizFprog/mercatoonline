import { IProductRepository } from 'src/domain/repository/product.repository.interface';
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products/update.products';
export declare class UpdateProductService {
    private readonly productPrisma;
    constructor(productPrisma: IProductRepository);
    execute(id: number, data: UpdateProductsDTO): any;
}
