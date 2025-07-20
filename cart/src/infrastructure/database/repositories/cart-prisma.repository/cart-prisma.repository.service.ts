import { Injectable } from '@nestjs/common';
import { Cart,Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICartRepository } from 'src/domain/repositories/cart.repository.interface';

@Injectable()
export class CartPrismaRepositoryService implements ICartRepository {

    constructor(
        private readonly prisma: PrismaService,
    ){}

    async create(data: Prisma.CartCreateInput): Promise<Cart> {
        return this.prisma.cart.create({data});
    }
    
    async findById(id: number): Promise<Cart | null> {

        return this.prisma.cart.findUnique({where:{id}});
    }

    async delete(id: number) {
        return this.prisma.cart.delete({where:{id}});     
    }

    
    /***constructor(private readonly prisma: PrismaService) {}

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

     */
}
