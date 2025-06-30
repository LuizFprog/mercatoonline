// gateway/src/presentation/controllers/auth.controller.ts
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDTO } from '../dtos/login.dto';


@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientKafka) {}

  @Post('/login')
  async login(@Body() data: LoginDTO) : Promise<any>{
    console.log("mandou request: ", data)
    const result = await firstValueFrom( this.client.send('auth.login', data)); 
    return result;
  }
}


