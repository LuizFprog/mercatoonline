import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { StorePrismaRepository } from './repositories/store-prisma.repository/store-prisma.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IStoreRepository,
      useClass: StorePrismaRepository,
    },
  ],
  exports: [IStoreRepository],
})
export class DatabaseModule {}