// Em src/interfaces/controllers/categories.controller.ts
import { Controller, Post, Body, Get,Param} from '@nestjs/common';
import { CreateCategoryProduct } from 'src/application/use-cases/category/create-category-product/create-category-product';
import { FindProductCatagoryService } from 'src/application/use-cases/category/find-product-category/find-product-category'
import { CreateCategoryDto } from 'src/interfaces/dtos/create.category/create.category';
import { FindAllProductCatagoryService } from 'src/application/use-cases/category/find-all-category/find-all-category';

@Controller('categories') // A rota base agora é /categories
export class CategoriesController {
  // Este controller só precisa de UMA dependência, muito mais limpo!
  constructor(private readonly createCategoryService: CreateCategoryProduct,
              private readonly findproductcategory: FindProductCatagoryService,
              private readonly findallproductcategory:FindAllProductCatagoryService
  ) {}

  @Post() // A rota para criar agora é POST /categories
  create(@Body() createCategoryDto: CreateCategoryDto) {
  return this.createCategoryService.execute(createCategoryDto);
  }

  @Get(':id')
  findByCaterory(@Param('id') id:number){
      return this.findproductcategory.execute(id)
  }

  @Get()
  findAllCategory(){
    return this.findallproductcategory.execute()
  }
}