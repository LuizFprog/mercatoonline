import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindByEmail {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email:string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}