import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PRODUCER',          // para publicar eventos de saída
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['kafka:9092'] },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
