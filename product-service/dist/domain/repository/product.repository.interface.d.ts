import { Product } from '../entities/products/product.entity';
import { priceDTO } from 'src/interfaces/dtos/price.DTO/price.DTO';
export declare const IProductRepository: unique symbol;
export interface IProductRepository {
    findById(id: number): any;
    findAll(): any;
    findByPriceRange(data: Partial<priceDTO>): any;
    findByCategory(id: number): any;
    create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): any;
    update(id: number, data: Partial<Product>): any;
    delete(id: number): any;
}
