import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository';
import { CreateProductDto } from 'src/interfaces/dtos/create.products';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateProductService {
    constructor(
        @Inject(IProductRepository)
        private readonly productRepository: IProductRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
    ) {}

    // Adicionado async/await
    async execute(data: CreateProductDto) {
        if (!data.name || !data.price || !data.categoryId) {
            throw new Error('Nome, preço e ID da categoria são obrigatórios.');
        }
        
        // 1. Espera a criação do produto no banco
        const newProduct = await this.productRepository.create(data);

        // 2. Publica o evento após o sucesso da criação
        this.natsClient.emit('product.created', newProduct);
        console.log(`[Product-Service] Evento 'product.created' publicado para o produto: ${newProduct.name}`);

        // 3. Retorna o produto criado
        return newProduct;
    }
}