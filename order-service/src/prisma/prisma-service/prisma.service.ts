import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy,OnModuleInit{

    // Este método é chamado quando o módulo é inicializado
    async onModuleInit() {
        await this.$connect();
    }

    // Este método será chamado AUTOMATICAMENTE quando a aplicação for encerrada
    async onModuleDestroy() {
        await this.$disconnect();
  }

}
