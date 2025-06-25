import { IProductRepository } from 'src/domain/repository/product.repository.interface';
import { priceDTO } from 'src/interfaces/dtos/price.DTO/price.DTO';
export declare class FindProductPriceService {
    private readonly productPrisma;
    constructor(productPrisma: IProductRepository);
    execute(price: priceDTO): any;
}
