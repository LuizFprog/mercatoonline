// Em src/infrastructure/database/repositories/category-prisma.repository.service.ts
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateCategoryDto } from 'src/interfaces/dtos/create.category/create.category';

@Injectable()
export class CategoryPrismaRepositoryService implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data: data,
    });
  }

  async findByCategory(id: number) {
        return await this.prisma.category.findMany({
            where:{id:id},
        })    
  }

  async findAllCategory() {
      return await this.prisma.category.findMany()
  }
}