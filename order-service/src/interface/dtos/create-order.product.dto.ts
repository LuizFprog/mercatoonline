import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsArray, ValidateNested, Min, IsNumber } from 'class-validator';

export class OrderProductDto {
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  price: number;
}
