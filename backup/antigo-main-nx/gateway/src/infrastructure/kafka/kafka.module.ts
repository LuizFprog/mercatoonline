// gateway/src/app/infrastructure/kafka/kafka.module.ts
import { Module, Inject, OnModuleInit } from '@nestjs/common';
import { ClientsModule, ClientKafka, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: { 
          client: { brokers: ['localhost:9092'] },
          consumer: {
            groupId: 'gateway-consumer',
          }, 
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    // ➊ Diz ao Nest que esperamos uma resposta para a pattern 'auth.login'
    this.client.subscribeToResponseOf('auth.login');
    // ➋ Conecta o producer/consumer
    await this.client.connect();
  }
}
