import { Product } from '../entities/products/product.entity'; 
import { priceDTO } from 'src/interfaces/dtos/price.DTO'

export const IProductRepository = Symbol('IProductRepository');

export interface IProductRepository{
    findById(id:number);
    findAll();
    findByPriceRange(data:Partial<priceDTO>)
    findByCategoryId(id:number);
    findAllCategory();
    create(data:Omit<Product,'id'|'createdAt'|'updatedAt'>)
    update(id:number,data:Partial<Product>)
    delete(id:number);
}