import { IsString, IsOptional, IsEmail, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateAddressDto {
  @IsString() @IsOptional() street?: string;
  @IsOptional() number?: number;
  @IsString() @IsOptional() complement?: string;
  @IsString() @IsOptional() cep?: string;
  @IsOptional() cityId?: number;
}

export class UpdateUserDto {
  @IsString() @IsOptional() name?: string;
  @IsEmail() @IsOptional() email?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() @MinLength(6) password?: string;
  
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}