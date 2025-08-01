import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Conecta a aplicação ao broker NATS para que ela possa OUVIR eventos
  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats_server:4222'],
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  // Inicia todos os microsserviços conectados (neste caso, o NATS)
  await app.startAllMicroservices();
  
  // Inicia o servidor HTTP
  await app.listen(3000);
  console.log(`Cart service is running on: ${await app.getUrl()}`);
}
bootstrap();