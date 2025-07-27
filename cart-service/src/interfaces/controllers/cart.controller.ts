import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCartUseCase } from 'src/application/use-cases/create-cart.service';
import { AddProductToCartUseCase } from 'src/application/use-cases/add-product-to-cart.use-case';
import { DeleteCartByIdService } from 'src/application/use-cases/delete-cart.service';
import { FindCartByIdService } from 'src/application/use-cases/find-cart-by-id.service';
import { FindCartAllService } from 'src/application/use-cases/find-cart-all.service';
import { CreateCartDto } from '../dto/create-cart.dto';
import { AddProductToCartDto } from '../dto/add-product-to-cart.dto';

@Controller('carts')
export class CartController {
  constructor(
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly addProductToCartUseCase: AddProductToCartUseCase,
    private readonly deleteCarId: DeleteCartByIdService,
    private readonly findCartById: FindCartByIdService,
    private readonly findCartAllService: FindCartAllService,

  ) {}

  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.createCartUseCase.execute(createCartDto);
  }

  @Post(':id/products')
  addProductToCart(
    @Param('id', ParseIntPipe) id: number,
    @Body() addProductDto: AddProductToCartDto,
  ) {
    return this.addProductToCartUseCase.execute(id, addProductDto);
  }

  @Get(':id')
  findbyId(@Param('id',ParseIntPipe) id:number){
    return this.findCartById.execute(id);
  }

  @Get()
  findAll(){
    return this.findCartAllService.execute();
  }
  @Delete('id')
  deleteCart(@Param('id', ParseIntPipe) id:number){
    return this.deleteCarId.execute(id);
  }
}