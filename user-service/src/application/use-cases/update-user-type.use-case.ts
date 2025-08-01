import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';

@Injectable()
export class UpdateUserTypeUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: number, newType: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      console.error(`[User-Service] Tentativa de atualizar o tipo de um usuário inexistente: ID ${userId}`);
      return;
    }

    await this.userRepository.update(userId, { typeUser: newType });
    console.log(`[User-Service] O tipo do usuário ID ${userId} foi atualizado para ${newType}.`);
  }
}