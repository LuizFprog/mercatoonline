import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/repository/IProductRepository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from 'src/interfaces/dtos/create.products';
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products';
import { priceDTO } from 'src/interfaces/dtos/price.DTO'

@Injectable()
export class ProductPrismaRepositoryService implements IProductRepository {
    
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateProductDto) {
        try{ 
            return await this.prisma.product.create({
                data: {
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    brand: data.brand,
                    batch: data.batch,
                    validity: data.validity,
                    category: {
                        connect: {
                            id: data.categoryId 
                        }
                    }
                }
            });
        }
        catch(error){
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    // --- MÉTODO FIND CAGEGORY BY ID ---
    async findByCategoryId(id: number) {
        try{
            const products = await this.prisma.product.findMany({
            where:{categoryId:id},
            })    
            return products;
        }
        catch(error){
            throw new Error(`Error finding products for category ID ${id}: ${error.message}`);
        }
        
    }

    // --- MÉTODO FIND ALL ---
    async findAll() {

        try{
            const productsAll = await this.prisma.product.findMany({
            include: {
                category: true, 
            }
            });
            return productsAll;
        }
        catch(error){
            throw new Error(`Error fetching all products: ${error.message}`);
        }
    }

    // --- MÉTODO FIND ALL CATEGORIES ---
    async findAllCategory() {
        try{
            return await this.prisma.product.findMany()
        }
        catch(error){
            throw new Error(`Error fetching all categories: ${error.message}`);     
        }
    }

    // --- MÉTODO FIND BY ID ---
    async findById(id: number) {
        try{
            const productById = await this.prisma.product.findUnique({
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
            return productById;
        }
        catch (error) {
            throw new Error(`Error finding product by ID ${id}: ${error.message}`); 
        }
        
    }

    // --- MÉTODO UPDATE ---
    async update(id: number, data: UpdateProductsDTO) {
        console.log(data+' '+id)
        
        try{
            return await this.prisma.product.update({
            where: { 
                id: id 
            },
                data: data 
            });

        }
        catch (error) {   
            throw new Error(`Error updating product with ID ${id}: ${error.message}`);}
        
    }

    // --- MÉTODO DELETE ---
    async delete(id: number) {

        try{
            return await this.prisma.product.delete({
                where: { 
                    id: id 
                }
            });

        }
        catch (error) {
            throw new Error(`Error deleting product with ID ${id}: ${error.message}`);
        }
    }

    // --- MÉTODO FIND BY PRICE ---
    /**
     * @param minPrice - O preço mínimo.
     * @param maxPrice - O preço máximo.
     * @returns Uma lista de produtos que atendem aos critérios.
     */
    async findByPriceRange(data:priceDTO) {

        try{
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
            } else{
                whereClause.AND.push({
                    price: {
                        gte: 0 
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
            else{
                whereClause.AND.push({
                    price: {
                        lte: 10000000
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

        catch (error) {
            throw new Error(`Error finding products by price range: ${error.message}`);
        }
    }
}