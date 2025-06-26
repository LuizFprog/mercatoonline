import { Injectable } from "@nestjs/common";
import {IOrderProductService} from 'src/domain/interface/repository/IOrder'
import { CreateOrderDto } from 'src/interface/dtos/create-order.dto'; 
import { PrismaService } from "src/infrastructure/prisma/prisma-service/prisma.service";

export class OrderPrismaRepository implements IOrderProductService{

    constructor(private prisma:PrismaService){}

    create(data: CreateOrderDto) {
        
   
    }

    findall() {
        
    }

    findbyId(id: number) {
        
    }

    delete(id: number) {
        
    }
}