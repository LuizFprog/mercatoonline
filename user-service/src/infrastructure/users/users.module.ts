import { Module } from '@nestjs/common';
import { UsersController } from '../../interfaces/controllers/users/users.controller';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user-by-id/find-user-by-id'
import { FindByEmail } from '../../application/use-cases/find.by.email/find.by.email'
import { UpdateUserUseCase } from '../../application/use-cases/updat-user/updat-user';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user/delete.user';
import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [
    DatabaseModule,PrismaModule, // Importa o módulo que exporta o IUserRepository
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindByEmail,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}