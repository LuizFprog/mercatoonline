import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CreateCartUseCase } from 'src/application/use-cases/create-cart.service';
import { AddProductToCartUseCase } from 'src/application/use-cases/add-product-to-cart.use-case';
import { DeleteCartByIdService } from 'src/application/use-cases/delete-cart.service';
import { FindCartByIdService } from 'src/application/use-cases/find-cart-by-id.service';
import { FindCartAllService } from 'src/application/use-cases/find-cart-all.service';
import { RemoveProductFromCartUseCase } from 'src/application/use-cases/remove-produtct-to-cart';
import { UpdateProductInCartUseCase } from 'src/application/use-cases/update-produtct-to-cart';
import { CreateCartDto } from '../dto/create-cart.dto';
import { AddProductToCartDto } from '../dto/add-product-to-cart.dto';
import { UpdateCartProductDto } from '../dto/update-cart-product.dto';

@Controller('carts')
export class CartController {
  constructor(
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly addProductToCartUseCase: AddProductToCartUseCase,
    private readonly deleteCarId: DeleteCartByIdService,
    private readonly findCartById: FindCartByIdService,
    private readonly findCartAllService: FindCartAllService,
    private readonly removeProductCart: RemoveProductFromCartUseCase,
    private readonly updateProductCart: UpdateProductInCartUseCase,

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

  @Patch('products/:cartProductId')
  updateProductInCart(
    @Param('cartProductId', ParseIntPipe) cartProductId: number,
    @Body() updateProductDto: UpdateCartProductDto,
  ) {
    return this.updateProductCart.execute(cartProductId, updateProductDto.amount);
  }

  @Delete('products/:cartProductId')
  removeProductFromCart(@Param('cartProductId', ParseIntPipe) cartProductId: number) {
    return this.removeProductCart.execute(cartProductId);
  }
}