import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindByCPF {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(cpf:string): Promise<User | null> {

    const user = await this.userRepository.findByCPF(cpf);
    if (!user) {  
      throw new Error(`User with CPF ${cpf} not found`);
    }
    return await this.userRepository.findByCPF(cpf);
  }
}