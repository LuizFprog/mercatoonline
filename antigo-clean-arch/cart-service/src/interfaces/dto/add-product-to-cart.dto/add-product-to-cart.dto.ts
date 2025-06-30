// cart-service/src/interfaces/cart-product/dto/add-product-to-cart.dto.ts
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class AddProductToCartDto {
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @Min(1)
  amount: number;
}