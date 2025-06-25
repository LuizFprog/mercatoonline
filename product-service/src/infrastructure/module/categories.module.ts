// Local: src/infrastructure/modules/categories.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesController } from 'src/interfaces/controllers/categories.controller';
import { CreateCategoryProduct } from 'src/application/use-cases/category/create-category-product/create-category-product';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository';
import { CategoryPrismaRepositoryService } from 'src/infrastructure/database/repositories/category/category-prisma.repository.service';
import { FindProductCatagoryService } from 'src/application/use-cases/category/find-product-category/find-product-category';
import { FindAllProductCatagoryService } from 'src/application/use-cases/category/find-all-category/find-all-category';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    CreateCategoryProduct,
    FindProductCatagoryService,
    FindAllProductCatagoryService,
    {
      provide: ICategoryRepository,
      useClass: CategoryPrismaRepositoryService,
    },
  ],
})
export class CategoriesModule {}