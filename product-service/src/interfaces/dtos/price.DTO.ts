import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PriceRangeDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price1?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price2?: number;
}
