import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE', // O token que usamos para injetar o cliente
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'], // O endereço do container NATS na rede Docker
        },
      },
    ]),
  ],
  exports: [ClientsModule], // ESSENCIAL: Exporta o cliente para outros módulos
})
export class NatsClientModule {}