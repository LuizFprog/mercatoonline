import { Inject, Injectable,NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindByEmail {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email:string): Promise<User | null> {

    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado.`);
    } 

    return await this.userRepository.findByEmail(email);
  }
}