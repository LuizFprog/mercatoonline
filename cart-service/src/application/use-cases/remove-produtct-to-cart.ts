import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICartRepository } from 'src/domain/repositories/cart.repository.interface';

@Injectable()
export class RemoveProductFromCartUseCase {
  constructor(
    @Inject(ICartRepository) private readonly cartRepository: ICartRepository,
  ) {}

  async execute(cartProductId: number) {
    const cartProduct = await this.cartRepository.findCartProductById(cartProductId);
    if (!cartProduct) {
      throw new NotFoundException(`Item do carrinho com ID ${cartProductId} não encontrado.`);
    }
    await this.cartRepository.removeProduct(cartProductId);
  }
}