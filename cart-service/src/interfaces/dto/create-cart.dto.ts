// create-cart.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';
export class CreateCartDto {
  @IsInt() @IsNotEmpty() userId: number;
}

