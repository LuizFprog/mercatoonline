import { IProductRepository } from 'src/domain/repository/product.repository.interface';
export declare class DeleteProductService {
    private readonly productPrisma;
    constructor(productPrisma: IProductRepository);
    execute(id: number): any;
}
