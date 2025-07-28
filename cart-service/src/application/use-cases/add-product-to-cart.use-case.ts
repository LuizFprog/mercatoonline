import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ICartRepository } from 'src/domain/repositories/cart.repository.interface';
import { AddProductToCartDto } from 'src/interfaces/dto/add-product-to-cart.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AddProductToCartUseCase {
  private readonly productServiceUrl = 'http://product-service:3000/products';
  constructor(
    @Inject(ICartRepository) private readonly cartRepository: ICartRepository,
    private readonly httpService: HttpService,
  ) {}

  async execute(cartId: number, data: AddProductToCartDto) {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException(`Carrinho com ID ${cartId} não encontrado.`);

    const product = await this.findProductById(data.productId);

    return this.cartRepository.addProduct({
      cartId,
      productId: product.id,
      productName: product.name,
      amount: data.amount,
      price: product.price,
      total: product.price * data.amount,
    });
  }

  private async findProductById(id: number): Promise<any> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${this.productServiceUrl}/${id}`));
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao se comunicar com o serviço de produtos.');
    }
  }
}
