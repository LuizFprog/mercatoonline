import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindByPhone {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(phone:string): Promise<User | null>{

    const user = await this.userRepository.findByPhone(phone);
    if (!user) {  
      throw new Error(`User with phone ${phone} not found`);
    }
    
    return await this.userRepository.findByPhone(phone);
  }
}