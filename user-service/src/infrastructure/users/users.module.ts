import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices'; 
import { UsersController } from 'src/interfaces/controllers/users/users.controller';
import { CreateUser } from 'src/application/use-cases/create-user';
import { FindUserById } from 'src/application/use-cases/find-user-by-id';
import { FindByEmail } from 'src/application/use-cases/find.by.email';
import { UpdateUserUseCase } from 'src/application/use-cases/update-user';
import { DeleteUser } from 'src/application/use-cases/delete.user';
import { FindUserAll } from 'src/application/use-cases/find.all.user';
import { FindByCPF } from 'src/application/use-cases/find.by.cpf';
import { FindByPhone } from 'src/application/use-cases/find.by.phone';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserEventsController } from 'src/interfaces/controllers/users/user-events.controller';
import { UpdateUserTypeUseCase} from 'src/application/use-cases/update-user-type.use-case'

@Module({
  imports: [
    DatabaseModule,

    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats_server:4222'],
        },
      },
    ]),
  ],
  controllers: [UsersController,UserEventsController],
  providers: [
    CreateUser,
    FindUserById,
    FindByEmail,
    FindUserAll,
    UpdateUserUseCase,
    DeleteUser,
    FindByCPF,
    FindByPhone,
    UpdateUserTypeUseCase,

  ],
})
export class UsersModule {}

