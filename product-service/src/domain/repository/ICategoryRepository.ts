import { CreateCategoryDto } from 'src/interfaces/dtos/create.category';

export const ICategoryRepository = Symbol('ICategoryRepository');

export interface ICategoryRepository {
  create(data: CreateCategoryDto);
  findByCategory(id:number);
  findAllCategory();
}