import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateProductDto } from 'src/interfaces/dtos/create.products/create.products';
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products/update.products';
import { priceDTO } from 'src/interfaces/dtos/price.DTO/price.DTO'

@Injectable()
export class ProductPrismaRepositoryService implements IProductRepository {
    
    constructor(private readonly prisma: PrismaService) {}

    // --- Create PRODUCTS ---
    async create(data: CreateProductDto) {
        return await this.prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                image: data.image,
                category: {
                    connect: {
                        id: data.categoryId 
                    }
                }
            }
        });
    }

    // --- MÉTODO FIND CAGEGORY BY ID ---
    async findByCategoryId(id: number) {
        return await this.prisma.product.findMany({
            where:{id:id},
        })    
    }

    // --- MÉTODO FIND ALL ---
    async findAll() {
        return await this.prisma.product.findMany({
            include: {
                category: true, 
            }
        });
    }

    // --- MÉTODO FIND ALL CATEGORIES ---
    async findAllCategory() {
      return await this.prisma.product.findMany()
  }

    // --- MÉTODO FIND BY ID ---
    async findById(id: number) {
        return await this.prisma.product.findUnique({
            where: {
                id: id 
            },
            include: {
                category: {
                    select: { 
                        name: true
                    }
                }
            }
        });
    }


    // --- MÉTODO UPDATE ---
    async update(id: number, data: UpdateProductsDTO) {
        return await this.prisma.product.update({
            where: { 
                id: id 
            },
            data: data // O DTO já contém os campos que podem ser atualizados
        });
    }

    // --- MÉTODO DELETE ---
    async delete(id: number) {
        return await this.prisma.product.delete({
            where: { 
                id: id 
            }
        });
    }

    // --- MÉTODO FIND BY PRICE ---
    /**
     * @param minPrice - O preço mínimo.
     * @param maxPrice - O preço máximo.
     * @returns Uma lista de produtos que atendem aos critérios.
     */
    async findByPriceRange(data:priceDTO) {

        const {price1,price2} = data;

        const whereClause: any = {
            AND: [] 
        };

        if (price1 !== undefined) {
            whereClause.AND.push({
                price: {
                    gte: price1 
                }
            });
        }

        if (price2 !== undefined) {
            whereClause.AND.push({
                price: {
                    lte: price2 
                }
            });
        }
        
        return await this.prisma.product.findMany({
          
            where: whereClause,
            include: {
                category: {
                    select: { name: true }
                }
            }
        });
    }
}