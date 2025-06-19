import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from 'src/domain/entities/user/user';

@Injectable()
export class FindByEmail {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email:string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}