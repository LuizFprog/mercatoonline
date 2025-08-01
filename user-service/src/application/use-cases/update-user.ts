import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User, Prisma } from '@prisma/client';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
  ) {}

  async execute(id: number, data: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const { address, password, ...userData } = data;

    const updatePayload: Prisma.UserUpdateInput = {
      ...userData,
    };

    if (password) {
      updatePayload.password = await bcrypt.hash(password, 10);
    }

    if (address) {
      // Atualiza o primeiro endereço encontrado para este usuário.
      updatePayload.addresses = {
        updateMany: {
          where: { userId: id },
          data: address,
        },
      };
    }

    const userUpdate = await this.userRepository.update(id, updatePayload);
    
    try {
      this.natsClient.emit('user.updated', userUpdate);
      console.log(`Evento 'user.updated' publicado para o usuário: ${userUpdate.email}`);
    } catch (error) {
      console.error('ERRO ao publicar evento no NATS:', error);
    }
 
    return userUpdate;
  }
}