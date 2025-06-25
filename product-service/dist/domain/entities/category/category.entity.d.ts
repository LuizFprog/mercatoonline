import { Product } from '../products/product.entity';
export declare class Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products?: Product[];
}
