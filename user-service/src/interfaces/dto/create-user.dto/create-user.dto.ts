// user-service/src/interfaces/user/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsEmail, IsInt, Min, Max, Length,MinLength } from 'class-validator';


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
  @Max(2) // TypeUser: 1 para cliente e 2 para vendedor, por exemplo
  typeUser: number;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;


}