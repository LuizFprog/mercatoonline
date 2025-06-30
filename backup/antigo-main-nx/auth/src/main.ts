// auth/src/app/main
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port:string = process.env.KAFKA_PORT
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
                brokers: [`localhost:${port}`],

        //brokers: [`kafka:${port}`],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    },
  });

  await app.listen();
    Logger.log(
    `🚀 AUTH on: ${port} - localhost(local) / kafka(docker)`
  );
}
bootstrap();

