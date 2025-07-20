import { Category } from '../category/category.entity';

export class Product {
  id: number;
  name: string;
  price: number;
  brand?: string; 
  batch?: string;
  store_id: number;
  stock_quantity: number;
  description?:string;
  validity?: string;
  image: string;
  createdAt: Date; 
  updatedAt: Date; 
  categoryId: number;

  category?: Category;
}