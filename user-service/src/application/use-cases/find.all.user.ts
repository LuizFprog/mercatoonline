import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class FindUserAll {
    constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

    async execute(): Promise<Omit<User, 'password'>[]> {
        return this.userRepository.findAll();
    }

}