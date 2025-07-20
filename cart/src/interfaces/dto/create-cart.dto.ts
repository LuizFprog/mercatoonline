import { IsInt, IsNotEmpty,IsArray, ValidateNested,} from 'class-validator';
import { Type } from 'class-transformer';
import {AddProductToCartDto} from './add-product-to-cart.dto'

export class CreateCartDto {


    @IsNotEmpty()
    @IsInt()
    userId: number;

     @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddProductToCartDto)
    cartProducts: AddProductToCartDto[];
   
}
