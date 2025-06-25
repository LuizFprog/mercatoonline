import { IProductRepository } from 'src/domain/repository/product.repository.interface';
export declare class FindProductAllService {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(): Promise<any>;
}
