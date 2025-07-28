import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StoresController } from 'src/interfaces/controllers/stores/store.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

// Importe TODOS os seus casos de uso de loja
import { CreateStoreUseCase } from 'src/application/use-cases/create-store.service';
import { FindByIDStoreService} from 'src/application/use-cases/find-store-by-id.service';
import { UpdateStoreService} from 'src/application/use-cases/update-store.service';
import { DeleteStoreService} from 'src/application/use-cases/delete-store.service';
import { FindByAllStoreService } from 'src/application/use-cases/find-store-by-all';
import { FindByCNPJStoreService } from 'src/application/use-cases/find-store-by-cnpj.service';
import { FindByNameStoreService } from 'src/application/use-cases/find-store-by-name.service';
import { FindByEMAILStoreService} from 'src/application/use-cases/find-store-by-email';

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
  controllers: [StoresController],
  providers: [
    CreateStoreUseCase,
    UpdateStoreService,
    FindByAllStoreService,
    FindByIDStoreService,
    FindByCNPJStoreService,
    DeleteStoreService,
    FindByNameStoreService,
    FindByEMAILStoreService
  ],
})
export class StoreModule {}