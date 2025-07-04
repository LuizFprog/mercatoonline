// src/application/use-cases/update-user/update-user.use-case.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User, Prisma } from '@prisma/client';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo'; // Corrigido o caminho do DTO
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUser {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number, data: UpdateUserDto): Promise<Omit<User, 'password'>> {
    
    const dataToUpdate=data;

    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    if (data.password) {
         
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    
      dataToUpdate.password = hashedPassword;
    }

    return this.userRepository.update(id, dataToUpdate);
  }
}
