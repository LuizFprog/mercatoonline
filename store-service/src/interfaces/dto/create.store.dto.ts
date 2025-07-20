import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsEmail, MinLength, ValidateNested, IsOptional } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateStoreDto {
  @IsInt() @IsNotEmpty() userId: number;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() cnpj: string;
  @IsEmail() @IsNotEmpty() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() logo_url?: string;
  
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  address: CreateAddressDto;
}