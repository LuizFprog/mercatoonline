import { Module } from '@nestjs/common';
import { UsersController } from 'src/interfaces/controllers/users/users.controller';
import { CreateUser } from 'src/application/use-cases/create-user';
import { FindUserById } from 'src/application/use-cases/find-user-by-id';
import { FindByEmail } from 'src/application/use-cases/find.by.email';
import { UpdateUser } from 'src/application/use-cases/update-user';
import { DeleteUser } from 'src/application/use-cases/delete.user';
import { FindUserAll } from 'src/application/use-cases/find.all.user';
import { FindByCPF } from 'src/application/use-cases/find.by.cpf';
import { FindByPhone } from 'src/application/use-cases/find.by.phone';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { NatsClientModule } from 'src/infrastructure/messaging/nats-client.module'; 


@Module({
  imports: [
    DatabaseModule,   // Fornece os repositórios (IUserRepository)
    NatsClientModule,   // Fornece o cliente NATS (NATS_SERVICE)
  ],
  controllers: [UsersController],
  providers: [
    CreateUser,
    FindUserById,
    FindByEmail,
    FindUserAll,
    UpdateUser,
    DeleteUser,
    FindByCPF,
    FindByPhone,
  ],
})
export class UsersModule {}
