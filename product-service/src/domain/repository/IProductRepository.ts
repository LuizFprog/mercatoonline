import { Product, Prisma } from '@prisma/client';
import { PriceRangeDto } from 'src/interfaces/dtos/price.DTO'

export const IProductRepository = Symbol('IProductRepository');

export interface IProductRepository{
    findById(id: number): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findByCategoryId(id: number): Promise<Product[]>;
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
    delete(id:number);
    findByPriceRange(data:Partial<PriceRangeDto>)
}