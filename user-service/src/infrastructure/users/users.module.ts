import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices'; // 1. Importações adicionais
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
// Não vamos mais importar o NatsClientModule aqui

@Module({
  imports: [
    DatabaseModule, // Fornece o IUserRepository

    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          // O nome do serviço no docker-compose é 'nats_server'
          servers: ['nats://nats_server:4222'],
        },
      },
    ]),
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

