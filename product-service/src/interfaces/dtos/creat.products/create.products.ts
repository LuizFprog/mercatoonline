// product-service/src/interfaces/product/dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsNumber, Min, IsUrl, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsUrl()
  @IsNotEmpty()
  image: string;
}