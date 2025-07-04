import {
  Inject,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindUserById {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
  ) {}

  async execute(id: number): Promise<User | null> {

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    try {
      this.natsClient.emit('user.id', user);
      console.log(`Evento 'user.id' publicado para o usuário: ${user.id}`);
    } catch (error) {
      // Se a publicação falhar, apenas registra o erro e continua.
      // A criação do usuário não é desfeita.
      console.error('ERRO ao publicar evento no NATS:', error);
    }

    return await this.userRepository.findById(id);
  }
}