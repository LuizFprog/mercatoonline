import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'],
    },
  });
  await app.listen();
  console.log('Notification service está escutando eventos do NATS');
}
bootstrap();
