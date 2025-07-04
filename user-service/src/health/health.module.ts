import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // O HealthController precisa do PrismaService
  controllers: [HealthController],
})
export class HealthModule {}