import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { ICartRepository } from 'src/domain/repositories/cart.repository.interface';
import { CreateCartDto } from 'src/interfaces/dto/create-cart.dto';

@Injectable()
export class CreateCartUseCase {
  constructor(
    @Inject(ICartRepository)
    private readonly cartRepository: ICartRepository
  ) {}
  
  async execute(data: CreateCartDto) {
    const cartExists = await this.cartRepository.findByUserId(data.userId);
    if (cartExists){
      throw new ConflictException(`Carrinho para o usuário com ID ${data.userId} já existe.`);
    } 
    return this.cartRepository.create({ userId: data.userId });
  }
}
