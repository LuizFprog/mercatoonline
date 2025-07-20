import { IsInt, IsNotEmpty } from 'class-validator';
export class AddProductToCartDto {
  @IsInt() @IsNotEmpty() productId: number;
  @IsInt() @IsNotEmpty() amount: number;
}