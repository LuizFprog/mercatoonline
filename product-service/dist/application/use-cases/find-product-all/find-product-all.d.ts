import { IProductRepository } from 'src/domain/repository/product.repository.interface';
export declare class FindProductAllService {
    private readonly productPrisma;
    constructor(productPrisma: IProductRepository);
    execute(): any;
}
