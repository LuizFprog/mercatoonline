import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsModule } from 'src/infrastructure/module/products-module';
import { CategoriesModule } from 'src/infrastructure/module/categories.module';

@Module({
  imports: [
    PrismaModule, 
    ProductsModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}