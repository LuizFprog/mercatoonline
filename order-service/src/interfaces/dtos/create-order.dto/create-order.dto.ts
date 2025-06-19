// order-service/src/interfaces/order/dto/create-order.dto.ts
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsArray, ValidateNested, Min, IsNumber } from 'class-validator';

class OrderProductDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  amount: number;

  @IsNumber()
  @Min(0.01)
  price: number;
}

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  addressId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  orderProducts: OrderProductDto[];
}