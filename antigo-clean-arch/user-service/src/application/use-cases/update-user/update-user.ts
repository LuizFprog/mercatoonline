// src/application/use-cases/update-user/update-user.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User, Prisma } from '@prisma/client';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo'; // Corrigido o caminho do DTO
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number, data: UpdateUserDto): Promise<Omit<User, 'password'>> {
    
    const dataToUpdate=data;

    if (data.password) {
         
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    
      dataToUpdate.password = hashedPassword;

      console.log('Nova senha fornecida, gerando hash...'+ hashedPassword);
    }

    return this.userRepository.update(id, dataToUpdate);
  }
}
