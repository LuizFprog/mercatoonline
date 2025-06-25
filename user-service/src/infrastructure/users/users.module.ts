import { Module } from '@nestjs/common';
import { UsersController } from 'src/interfaces/controllers/users/users.controller';
import { CreateUserUseCase } from 'src/application/use-cases/create-user/create-user';
import { FindUserByIdUseCase } from 'src/application/use-cases/find-user-by-id/find-user-by-id'
import { FindByEmail } from 'src/application/use-cases/find.by.email/find.by.email'
import { UpdateUserUseCase } from 'src/application/use-cases/update-user/update-user';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user/delete.user';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module'
import { FindUserAll } from 'src/application/use-cases/find.all.user/find.all.user';

@Module({
  imports: [
    DatabaseModule,PrismaModule, // Importa o módulo que exporta o IUserRepository
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindByEmail,
    FindUserAll,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}