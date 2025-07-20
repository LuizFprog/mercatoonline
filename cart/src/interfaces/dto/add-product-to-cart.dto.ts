// cart-service/src/interfaces/cart-product/dto/add-product-to-cart.dto.ts
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddProductToCartDto {
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @Min(1)
  amount: number;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsNumber()
  @Min(0.01)
  total: number;
}