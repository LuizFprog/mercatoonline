import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UpdateUserTypeUseCase } from 'src/application/use-cases/update-user-type.use-case';

@Controller()
export class UserEventsController {
  constructor(
    private readonly updateUserTypeUseCase: UpdateUserTypeUseCase
  ) {}

  @EventPattern('user.became.store_owner')
  async handleUserBecameStoreOwner(@Payload() data: { userId: number }) {
    console.log(`[User-Service] Evento 'user.became.store_owner' recebido para o usuário ID: ${data.userId}`);
    await this.updateUserTypeUseCase.execute(data.userId, 2); // 2 = Lojista
  }
}
