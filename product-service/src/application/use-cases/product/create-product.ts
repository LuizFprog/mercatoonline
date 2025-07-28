import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository';
import { Product, Prisma } from '@prisma/client';
import { CreateProductDto } from 'src/interfaces/dtos/create.products';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
  ) {}

  async execute(data: CreateProductDto): Promise<Product> {
    const createInput: Prisma.ProductCreateInput = {
      name: data.name,
      price: data.price,
      image: data.image,
      brand: data.brand,
      description: data.description,
      storeId: data.storeId,
      batch: data.batch,
      validity: data.validity,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    };

    this.natsClient.emit('product.created', createInput);
    console.log(`[Product-Service] Evento 'product.created' publicado novo produto. Nome: ${createInput.name}`);
    
    return this.productRepository.create(createInput);
  }
}