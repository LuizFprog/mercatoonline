import { IsString, IsNotEmpty, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateAddressDto {
  //@IsInt()
  //@IsNotEmpty()
  //userId: number;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsInt()
  @IsNotEmpty()
  cityId: number;
}