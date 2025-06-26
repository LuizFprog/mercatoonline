import { Product } from '../products/product.entity';

export class Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  // Propriedade para a relação inversa
  products?: Product[];
}