import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from 'src/domain/entities/user/user';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}