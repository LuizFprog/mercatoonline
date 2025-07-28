import { IsInt, IsNotEmpty, Min, IsNumber } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  total: number;
}
