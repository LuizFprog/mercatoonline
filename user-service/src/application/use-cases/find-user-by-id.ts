import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindUserById {
  constructor(
    @Inject(IUserRepository) 
    private readonly userRepository: IUserRepository) {}

    async execute(id: number): Promise<Omit<User, 'password'>> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        return user;
    }
}