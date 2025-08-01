import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeactivateCartUseCase } from 'src/application/use-cases/deactivate-cart.use-case';

@Controller()
export class CartEventsController {
  constructor(
    private readonly deactivateCartUseCase: DeactivateCartUseCase
  ) {}

  @EventPattern('order.created.from.cart')
  async handleOrderCreated(@Payload() data: { cartId: number }) {
    console.log(`[Cart-Service] Evento 'order.created.from.cart' recebido para o carrinho ID: ${data.cartId}`);
    await this.deactivateCartUseCase.execute(data.cartId);
  }
}