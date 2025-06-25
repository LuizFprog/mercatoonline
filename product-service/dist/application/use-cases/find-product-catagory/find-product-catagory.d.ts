import { IProductRepository } from 'src/domain/repository/product.repository.interface';
export declare class FindProductCatagoryService {
    private readonly productPrisma;
    constructor(productPrisma: IProductRepository);
    execute(categoryId: number): any;
}
