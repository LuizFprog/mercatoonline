import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IUserRepository } from '../../domain/interface.repository/user.interface.repository/user.repository.interface';
import { UserPrismaRepository } from './repositories/user-prisma.repository/user-prisma.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [
    
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [IUserRepository],
})
export class DatabaseModule {}