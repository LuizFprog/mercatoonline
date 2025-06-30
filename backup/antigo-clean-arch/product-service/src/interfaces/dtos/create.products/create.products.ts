import { IsString, IsNotEmpty, IsNumber, Min, IsUrl, IsInt } from 'class-validator';
import { CreateCategoryDto } from 'src/interfaces/dtos/create.category/create.category'

export class CreateProductDto {
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0.01)
  price: number;
  
  @IsString()
  brand?: string;

  @IsString()
  batch?:string;

  @IsString()
  validity?: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;
}