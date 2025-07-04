import { CreateCategoryDto } from 'src/interfaces/dtos/create.category';
import { Category } from '../entities/category/category.entity';

export const ICategoryRepository = Symbol('ICategoryRepository');

export interface ICategoryRepository {
  create(data: CreateCategoryDto);
  findByCategory(id:number);
  findAllCategory();
}