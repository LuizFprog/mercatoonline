// order-service/src/interfaces/order/dto/create-order.dto.ts
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsArray, ValidateNested, Min, IsNumber } from 'class-validator';
import { OrderProductDto } from './create-order.product.dto'

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  addressId: number;

  @IsInt()
  paymentId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  orderProducts: OrderProductDto[];
}
