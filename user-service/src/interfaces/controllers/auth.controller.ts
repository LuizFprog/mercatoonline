import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../application/auth/auth.service';
import { AuthLoginDto } from 'src/interfaces/dto/dto.auth.login/dto.auth.login'
//import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() authLoginDTO: AuthLoginDto){
        console.log(authLoginDTO.email)
        return await this.authService.login(authLoginDTO);
    }
}
