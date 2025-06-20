// user-service/src/interfaces/user/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsEmail, IsInt, Min, Max, Length,MinLength,ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'
import { CreateAddressDto } from '../create-address.dto/create-address.dto'


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(11, 11, { message: 'CPF deve conter 11 dígitos' })
  cpf: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(1)
  @Max(2)
  typeUser: number;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsNotEmpty()
  @ValidateNested() // Diz ao class-validator para validar o objeto aninhado também
  @Type(() => CreateAddressDto) // Diz ao class-transformer qual classe usar para o objeto aninhado
  address: CreateAddressDto;

}