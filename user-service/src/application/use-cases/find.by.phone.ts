import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindByPhone {
  constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

    async execute(phone: string): Promise<Omit<User, 'password'>> {
        const user = await this.userRepository.findByPhone(phone);
        if (!user) {
            throw new NotFoundException(`Usuário com telefone ${phone} não encontrado.`);
        }
        return user;
    }
}