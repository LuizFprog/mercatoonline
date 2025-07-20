import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  storeId: number;

  @IsString()
  @IsNotEmpty()
  batch: string;

  @IsString()
  @IsNotEmpty()
  validity: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}