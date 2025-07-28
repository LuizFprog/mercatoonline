import { PriceRangeDto } from 'src/interfaces/dtos/price.DTO'
import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductPrismaRepository implements IProductRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({ data });
    }

    async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        try {
        return await this.prisma.product.update({ where: { id }, data });
        } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
        throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
        await this.prisma.product.delete({ where: { id } });
        } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
        throw error;
        }
    }

    async findById(id: number): Promise<Product | null> {
        return this.prisma.product.findUnique({ where: { id }, include: { category: true } });
    }

    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany({ include: { category: true } });
    }

    async findByCategoryId(id: number): Promise<Product[]> {
        return this.prisma.product.findMany({ where: { categoryId: id } });
    }

    async findByPriceRange(data: PriceRangeDto): Promise<Product[]> {
        try {
            const { price1, price2 } = data;

            const whereClause: Prisma.ProductWhereInput = {
                price: {
                    gte: price1 ?? 0,
                    lte: price2 ?? Number.MAX_SAFE_INTEGER,
                },
            };

            return this.prisma.product.findMany({
                where: whereClause,
                include: {
                    category: {
                        select: { name: true },
                    },
                },
            });
        } catch (error) {
            throw new Error(`Erro ao procurar produtos por intervalo de preço: ${error.message}`);
        }
    }
}

    