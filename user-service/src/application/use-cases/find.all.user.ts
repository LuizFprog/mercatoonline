import { Inject, Injectable} from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindUserAll {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
  ) {}

  async execute(): Promise<User[] | null> {
    
    const users = await this.userRepository.findAll();
    
    if (!users || users.length === 0) {
      return []; 
    } 

    try {
      this.natsClient.emit('users_list', users);
      console.log(`Evento 'users_list' publicado para o usuários`);
    } catch (error) {
      // Se a publicação falhar, apenas registra o erro e continua.
      console.error('ERRO ao publicar evento no NATS:', error);
    }
    return users;
  }
}