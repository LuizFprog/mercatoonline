import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module'; 
import { IProductRepository } from 'src/domain/repository/IProductRepository'; 
import { ProductPrismaRepositoryService } from 'src/infrastructure/database/repositories/product/product-prisma.repository.service'; 
import { ProductsController } from 'src/interfaces/controllers/products.controller';
import { CreateProductService } from 'src/application/use-cases/product/create-product/create-product';
import { DeleteProductService } from 'src/application/use-cases/product/delete-product/delete-product';
import { FindProductAllService } from 'src/application/use-cases/product/find-product-all/find-product-all';
import { FindProductByIdService } from 'src/application/use-cases/product/find-product-by-id/find-product-by-id';
import { FindProductPriceService } from 'src/application/use-cases/product/find-product-price/find-product-price';
import { UpdateProductService } from 'src/application/use-cases/product/update-product/update-product';
import { FindProductCatagoryService } from 'src/application/use-cases/product/find-product-category.id/find-product-category.id';
import { FindAllProductCatagoryService } from 'src/application/use-cases/product/findall-categoryproducts/findall-categoryproducts';


@Module({
  imports: [PrismaModule],
  controllers: [
    ProductsController, 
  ],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductPrismaRepositoryService,
    },
    CreateProductService,
    DeleteProductService,
    FindProductAllService,
    FindProductByIdService,
    FindProductPriceService,
    UpdateProductService,
    FindProductCatagoryService,
    FindAllProductCatagoryService,
  ],
})
export class ProductsModule {}