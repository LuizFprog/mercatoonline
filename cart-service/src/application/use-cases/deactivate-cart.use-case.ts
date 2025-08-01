import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from 'src/domain/repositories/cart.repository.interface';

@Injectable()
export class DeactivateCartUseCase {
  constructor(
    @Inject(ICartRepository) private readonly cartRepository: ICartRepository,
  ) {}

  async execute(cartId: number) {
    await this.cartRepository.updateStatus(cartId, 'inactive');
    console.log(`[Cart-Service] Carrinho ID ${cartId} foi desativado.`);
  }
}
