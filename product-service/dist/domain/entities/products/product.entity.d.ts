import { Category } from '../category/category.entity';
export declare class Product {
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
    category?: Category;
}
