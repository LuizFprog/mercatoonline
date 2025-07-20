import { Controller,Post,Get,Delete,Patch,Body,Param,ParseIntPipe} from '@nestjs/common';
import { CreateCartService} from 'src/application/use-cases/create-cart.service'
import { DeleteCartByIdService} from 'src/application/use-cases/delete-cart.service'
import { FindCartByIdService} from 'src/application/use-cases/find-cart-by-id.service'
import { Prisma, Cart } from '@prisma/client';

@Controller('carts')
export class CartController {


    constructor(private readonly create_: CreateCartService,
              private readonly delete_: DeleteCartByIdService,
              private readonly findId_:FindCartByIdService,
  
  ) {}

  @Post() 
  createCart(@Body() createCartDto: Cart) {
    return this.create_.execute(createCartDto);
  }

  @Get(':id')
  findByCart(@Param('id',ParseIntPipe) id:number){
      return this.findId_.execute(id)
  }

  @Delete(':id')
  deleteCart(@Param('id', ParseIntPipe) id: number){
    return this.delete_.execute(id);

  }
}
