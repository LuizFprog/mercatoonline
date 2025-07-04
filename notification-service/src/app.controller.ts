import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Este decorator diz: "execute este método quando um evento
  // com o padrão 'user.created' for recebido"
  @EventPattern('user.created')
  handleUserCreated(@Payload() data: any) {
    console.log('--- Novo Evento Recebido: user.created ---');
    console.log('Enviando e-mail de boas-vindas para:', data.email);
    // Aqui você integraria com um serviço de e-mail de verdade
    console.log('-------------------------------------------');
  }
}
