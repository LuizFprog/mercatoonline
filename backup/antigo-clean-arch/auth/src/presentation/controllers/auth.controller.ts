import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUseCase } from 'auth/src/domain/use-cases/login.use-case';
import { LoginDTO } from '../dtos/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly login: LoginUseCase) {}

  @MessagePattern('auth.login')        // <‑‑ EventPattern! não retorna nada
  async handleLogin(@Payload() dto: LoginDTO) {
    // pode lançar exceções; o gateway decidirá o que fazer
  const result = await this.login.execute(dto);
  // 2) devolve diretamente (RPC)
  return result;
  }
}
