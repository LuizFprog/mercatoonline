import { IsString, IsNotEmpty, IsNumber, Min, IsUrl, IsInt } from 'class-validator';

export class UpdateProductsDTO{

  @IsInt()
  @IsNotEmpty()
  categoryId?: number;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  description?: string;

  @IsNumber()
  @Min(0.01)
  price?: number;
  
  @IsNumber()
  @Min(0)
  stock_quantity?: number;
  
  @IsString()
  image_url?: string;
  
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