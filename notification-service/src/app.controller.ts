import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  // --- Eventos do User Service ---
  @EventPattern('user.created')
  handleUserCreated(@Payload() data: any) {
    console.log('--- Evento Recebido: user.created ---');
    console.log('Enviando e-mail de boas-vindas para:', data.email);
    // Lógica para enviar e-mail de boas-vindas...
    console.log('------------------------------------');
  }

  @EventPattern('user.updated')
  handleUserUpdate(@Payload() data: any) {
    console.log('--- Evento Recebido: user.updated ---');
    console.log('Enviando e-mail de atualização de perfil para:', data.email);
    // Lógica para enviar e-mail de boas-vindas...
    console.log('------------------------------------');
  }

  // --- Eventos do Store Service ---
  @EventPattern('store.created')
  handleStoreCreated(@Payload() data: any) {
    console.log('--- Evento Recebido: store.created ---');
    console.log('Enviando e-mail de boas-vindas para:', data.email);
    // Lógica para enviar e-mail de boas-vindas...
    console.log('------------------------------------');
  }

  @EventPattern('store.updated')
  handleStoreUpdate(@Payload() data: any) {
    console.log('--- Evento Recebido: store.updated ---');
    console.log('Enviando e-mail de atualização de perfil para:', data.email);
    // Lógica para enviar e-mail de boas-vindas...
    console.log('------------------------------------');
  }
  
  // --- Eventos do Product Service ---
  @EventPattern('product.created')
  handleProductCreated(@Payload() data: any) {
    console.log('--- Evento Recebido: product.created ---');
    console.log(`Notificando a loja ${data.storeId} sobre o novo produto: ${data.name}`);
    // Lógica para enviar e-mail para a loja...
    console.log('------------------------------------');
  }

  @EventPattern('product.deleted')
  handleProductDelete(@Payload() data: any) {
    console.log('--- Evento Recebido: product.deleted ---');
    console.log(`Notificando a loja ${data.storeId} sobre o exclusão de produto: ${data.name}`);
    // Lógica para enviar e-mail para a loja...
    console.log('------------------------------------');
  }

  @EventPattern('product.updated')
  handleProductUpdated(@Payload() data: any) {
    console.log('--- Evento Recebido: product.updated ---');
    console.log(`Notificando a loja ${data.storeId} sobre a atualização do produto: ${data.name}`);
    // Lógica para enviar e-mail para a loja...
    console.log('------------------------------------');
  }

  // --- Eventos do Order Service ---
  @EventPattern('order.created')
  handleOrderCreated(@Payload() data: any) {
    console.log('--- Evento Recebido: order.created ---');
    console.log(`Enviando e-mail de confirmação do pedido ${data.id} para o usuário ${data.userId}`);
    // Lógica para enviar e-mail de confirmação para o cliente...
    console.log('------------------------------------');
  }

  // --- Eventos do Cart Service ---
  @EventPattern('cart.created')
  handleCartCreated(@Payload() data: any) {
    console.log('--- Evento Recebido: cart.created ---');
    console.log(`Enviando e-mail de confirmação de solicitação de pedido ${data.id} para o usuário ${data.userId}`);
    // Lógica para enviar e-mail de confirmação para o cliente...
    console.log('------------------------------------');
  }
}