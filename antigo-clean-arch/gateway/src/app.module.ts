import { Module } from '@nestjs/common';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [KafkaModule],
  controllers: [AuthController],
})
export class AppModule {}
