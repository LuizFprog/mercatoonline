import { IProductRepository } from 'src/domain/repository/product.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from 'src/interfaces/dtos/create.products/create.products';
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products/update.products';
import { priceDTO } from 'src/interfaces/dtos/price.DTO/price.DTO';
export declare class ProductPrismaRepositoryService implements IProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductDto): Promise<any>;
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    update(id: number, data: UpdateProductsDTO): Promise<any>;
    delete(id: number): Promise<any>;
    findByPriceRange(data: priceDTO): Promise<any>;
    findByCategory(id: number): Promise<any>;
}
