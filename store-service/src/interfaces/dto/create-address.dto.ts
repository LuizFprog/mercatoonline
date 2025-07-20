import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString() @IsNotEmpty() street: string;
  @IsInt() @IsNotEmpty() number: number;
  @IsString() @IsOptional() complement?: string;
  @IsString() @IsNotEmpty() cep: string;
  @IsInt() @IsNotEmpty() cityId: number;
}