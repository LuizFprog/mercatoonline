import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindByCPF {
  constructor(
    @Inject(IUserRepository) 
    private readonly userRepository: IUserRepository) {}

    async execute(cpf: string): Promise<Omit<User, 'password'>> {
        const user = await this.userRepository.findByCPF(cpf);
        if (!user) {
            throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
        }
        return user;
    }
}