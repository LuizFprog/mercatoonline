// src/domain/entities/products/product.entity.ts
import { Category } from '../category/category.entity';

export class Product {
  id: number;
  name: string;
  price: number;
  brand?: string; 
  batch?: string;
  validity?: string;
  image: string;
  createdAt: Date; 
  updatedAt: Date; 
  categoryId: number;

  // Propriedade para a relação, que pode ser preenchida pelo Prisma
  category?: Category;
}