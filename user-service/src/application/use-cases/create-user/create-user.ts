import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<Omit<User, 'password'>> {

    const { password, ...userData } = data;

    const userExists = await this.userRepository.findByEmail(userData.email);
    if (userExists) {
      throw new ConflictException('Usuário com este e-mail já existe.');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    return this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }
}
