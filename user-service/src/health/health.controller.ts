import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    try {
      // Tenta fazer uma consulta simples para garantir que a conexão com o banco está ativa.
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'connected' };
    } catch (e) {
      console.error('Health check falhou: não foi possível conectar ao banco.', e);
      // Lança um erro para que o healthcheck do Docker falhe
      throw new NotFoundException('Database not connected');
    }
  }
}
