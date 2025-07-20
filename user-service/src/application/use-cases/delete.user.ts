import { Inject, Injectable,NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { promises } from 'dns';

@Injectable()
export class DeleteUser {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
  ) {}

  async execute(id:number): Promise<void> {

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    } 

     try {
      this.natsClient.emit('user.deleted', user);
      console.log(`Evento 'user.deleted' publicado para o usuário: ${user.name}`);
    } catch (error) {
      console.error('ERRO ao publicar evento no NATS:', error);
    }
    

    this.userRepository.delete(id);
    
  }
}