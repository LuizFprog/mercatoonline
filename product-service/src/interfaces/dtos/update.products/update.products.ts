import { IsString, IsNotEmpty, IsNumber, Min, IsUrl, IsInt } from 'class-validator';

export class UpdateProductsDTO{

  @IsInt()
  @IsNotEmpty()
  categoryId?: number;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @Min(0.01)
  price?: number;

  @IsString()
  brand?: string;

  @IsString()
  batch?:string;

  @IsString()
  validity?: string;


  @IsUrl()
  @IsNotEmpty()
  image?: string;
}