import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}