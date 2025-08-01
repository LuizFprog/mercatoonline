import { IsInt, IsNotEmpty, Min } from 'class-validator';
export class UpdateCartProductDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  amount: number;
}