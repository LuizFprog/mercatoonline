import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from 'src/domain/entities/user/user';
import { UpdateUserDto } from '../../../interfaces/dto/update.user.dto/update.user.tdo'

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(updateuserdto:UpdateUserDto){
    // Apenas delega a chamada, poderia ter lógicas de permissão aqui.
    return '';
  }
}