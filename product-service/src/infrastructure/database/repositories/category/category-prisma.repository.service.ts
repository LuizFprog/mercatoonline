import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateCategoryDto } from 'src/interfaces/dtos/create.category/create.category';

@Injectable()
export class CategoryPrismaRepositoryService implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    try{
        return await this.prisma.category.create({
        data: data,
      });
    }
    catch(error){
        throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async findByCategory(id: number) {
    try{
      const categoryAll = await this.prisma.category.findMany({
            where:{id:id},
        })    
        return categoryAll;
    }
    catch(error){
        throw new Error(`Error fetching category: ${error.message}`);
    }
  }

  async findAllCategory() {
    const categoryAll = await this.prisma.category.findMany();
    if (categoryAll.length === 0) {
      throw new Error('No categories found');
    }
      return categoryAll;
  }
}