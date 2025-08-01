import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
    @IsEmail({}, { message: 'Por favor, insira um email válido.' }) // Você pode até customizar as mensagens de erro
    @IsNotEmpty({ message: 'O campo de email não pode estar vazio.' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'O campo de senha não pode estar vazio.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password: string;
}