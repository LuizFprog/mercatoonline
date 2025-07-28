import { Body, Controller,Delete,Get, Param, Patch, Post,ParseIntPipe } from '@nestjs/common';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product'
import { FindProductAllService } from 'src/application/use-cases/product/find-product-all'
import { FindProductByIdService } from 'src/application/use-cases/product/find-product-by-id'
import { FindProductPriceService } from 'src/application/use-cases/product/find-product-price'
import { DeleteProductService } from 'src/application/use-cases/product/delete-product'
import { UpdateProductService } from 'src/application/use-cases/product/update-product'
import { PriceRangeDto } from 'src/interfaces/dtos/price.DTO'
import { CreateProductDto } from 'src/interfaces/dtos/create.products'
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products'
import { FindProductCatagoryService } from 'src/application/use-cases/product/find-product-category.id';

@Controller('products')
export class ProductsController {

    constructor(
        private createproducts: CreateProductUseCase,
        private findproductsid: FindProductByIdService,
        private findall: FindProductAllService,
        private findabyprice: FindProductPriceService,
        private deleteproduct: DeleteProductService,
        private updateproduct: UpdateProductService,
        private findcategoryproduct:FindProductCatagoryService,
    ){}


    @Get(':id')
    findById(@Param('id',ParseIntPipe) id:number){
        return this.findproductsid.execute(id)
    }

    @Get()
    findAll(){
        return this.findall.execute()
    }  

    @Get('categories/:id')
    findByCategoryProduct(@Param('id',ParseIntPipe) id:number){
      return this.findcategoryproduct.execute(id)
    }

    @Post('price')
    findByPrice(@Body() price:PriceRangeDto){
        return this.findabyprice.execute(price)
    }

    @Post()
    createProducts(@Body() data:CreateProductDto){
        return this.createproducts.execute(data)
    }

    @Patch(':id')
    updateProducts(@Param('id',ParseIntPipe) id: number, @Body() data: UpdateProductsDTO){
        return this.updateproduct.execute(id,data)
    }

    @Delete(':id')
    DeleteProductService(@Param('id',ParseIntPipe) id:number){
        return this.deleteproduct.execute(id)
    }
}
