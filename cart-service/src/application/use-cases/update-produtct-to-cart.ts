import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICartRepository } from 'src/domain/repositories/cart.repository.interface';

@Injectable()
export class UpdateProductInCartUseCase {
  constructor(
    @Inject(ICartRepository) private readonly cartRepository: ICartRepository,
  ) {}

  async execute(cartProductId: number, amount: number) {
    const cartProduct = await this.cartRepository.findCartProductById(cartProductId);
    if (!cartProduct) {
      throw new NotFoundException(`Item do carrinho com ID ${cartProductId} não encontrado.`);
    }
    const newTotal = cartProduct.price * amount;
    return this.cartRepository.updateProductAmount(cartProductId, amount, newTotal);
  }
}