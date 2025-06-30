import { Injectable } from "@nestjs/common";
import { IOrderProductService } from 'src/domain/interface/repository/IOrder';
import { CreateOrderDto } from 'src/interface/dtos/create-order.dto'; 
import { PrismaService } from "src/infrastructure/prisma/prisma-service/prisma.service";

@Injectable() 
export class OrderPrismaRepository implements IOrderProductService {

    constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
        
    try{
        return await this.prisma.order.create({
            data: {
                userId: data.userId,
                addressId: data.addressId,
                paymentId: data.paymentId,
                orderProducts: {
                    create: data.orderProducts.map(product => ({
                        productId: product.productId,
                        amount: product.amount,
                        price: product.price
                    }))
                }
            },
            include: {
                orderProducts: true,
            }
        });
    }
    catch(error){
        throw new Error(`Error creating order: ${error.message}`);  
    }
    
    }

    async findall() {
        try
        {
            const orders = await this.prisma.order.findMany({
                include: {
                    orderProducts: true, 
                },
            });

            return orders


        }
        catch(error){
            throw new Error(`Error fetching orders: ${error.message}`);
               
        }
    }

    async findbyId(id: number) {

        try
        {
            const findOrder = await this.prisma.order.findUnique({
            where: { id:id },
            include: {
                orderProducts: true, 
            },
            });

            if(!findOrder) {
                throw new Error(`Order with id ${id} does not exist`);
            }
            return findOrder;
        }
        catch(error){
            throw new Error(`Error fetching order by id: ${error.message}`);
        }
    }

    async delete(id: number) {

        try{
            const orderExists = await this.prisma.order.findUnique({
                where: { id },
            });

            if (!orderExists) {
                throw new Error(`Order with id ${id} does not exist`);
            }
            
            return this.prisma.order.delete({
                where: { id },
            });
        }
        catch(error){
            throw new Error(`Error deleting order: ${error.message}`);
        }
    }
}