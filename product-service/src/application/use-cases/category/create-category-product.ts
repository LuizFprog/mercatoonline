import { Injectable, Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repository/ICategoryRepository';
import { CreateCategoryDto } from 'src/interfaces/dtos/create.category';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateCategoryProduct {
    constructor(
        @Inject(ICategoryRepository)
        private readonly categoryRepository: ICategoryRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
    ) {}

    // Adicionado async/await
    async execute(data: CreateCategoryDto) {
        if (!data.name) {
            throw new Error('O nome da categoria é obrigatório.');
        }

        const newCategory = await this.categoryRepository.create(data);

        this.natsClient.emit('category.created', newCategory);
        console.log(`[Product-Service] Evento 'category.created' publicado para a categoria: ${newCategory.name}`);

        return newCategory;
    }
}
