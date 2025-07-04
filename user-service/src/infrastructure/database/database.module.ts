import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module'; // Depende do PrismaModule
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { UserPrismaRepository } from 'src/infrastructure/database/repositories/user-prisma.repository/user.prisma.repository.service';

@Module({
  imports: [PrismaModule], // Importa o PrismaModule para ter acesso ao PrismaService
  providers: [
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    // Adicione outros provedores de repositório aqui no futuro
  ],
  exports: [IUserRepository], // Exporta o repositório para os Casos de Uso
})
export class DatabaseModule {}