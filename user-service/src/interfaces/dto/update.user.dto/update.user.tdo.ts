// user-service/src/interfaces/user/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsEmail, IsInt, Min, Max, ValidateNested,MinLength } from 'class-validator';
import { Type } from 'class-transformer'
import { CreateAddressDto } from '../create-address.dto/create-address.dto'


export class UpdateUserDto {
 
  @IsEmail()
  email?: string;

  @IsInt()
  @Min(1)
  @Max(2)
  typeUser?: number;

  @IsString()
  phone?: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password?: string;

  @IsNotEmpty()
  @ValidateNested() 
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
  
}