import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from 'src/domain/entities/user/user';
import { CreateUserDto } from '../../../interfaces/dto/create-user.dto/create-user.dto';
// import * as bcrypt from 'bcrypt'; próximo passo

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository) // Injeta o repositório usando o token
    private readonly userRepository: IUserRepository,
  ) {}

  async execute() {
    return '';
  }
}