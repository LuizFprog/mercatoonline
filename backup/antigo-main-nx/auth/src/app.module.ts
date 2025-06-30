
import { Module } from '@nestjs/common';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { LoginUseCase } from './domain/use-cases/login.use-case';

@Module({
  imports: [KafkaModule, PrismaModule],
  controllers: [AuthController],
  providers: [LoginUseCase],
})
export class AppModule {}
