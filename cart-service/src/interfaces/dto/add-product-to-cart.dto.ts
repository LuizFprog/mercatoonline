import { IsInt, IsNotEmpty, Min } from 'class-validator';
export class AddProductToCartDto {
  @IsInt() @IsNotEmpty() productId: number;
  @IsInt() @IsNotEmpty() @Min(1) amount: number;
}