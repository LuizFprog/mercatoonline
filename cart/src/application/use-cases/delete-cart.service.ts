import { Injectable, Inject} from '@nestjs/common';
import {ICartRepository } from 'src/domain/repositories/cart.repository.interface'
import { ClientProxy } from '@nestjs/microservices';
import { Prisma, Cart } from '@prisma/client';

@Injectable()
export class DeleteCartByIdService {


    constructor(
                @Inject(ICartRepository)
                private readonly cartPrisma: ICartRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}

    async execute(id:number){
        
        try{
            const cart = await this.cartPrisma.delete(id);
         
            if(!cart){
            throw new Error(`Carinho com ID ${id} não encontrado`);
            }
            
            const mensage = {response:'Carrinho deletado com êxito'}

            return mensage;

        }
        catch
        {
            throw new Error(`Erro ao tentar apagar carrinho`);
        }

        
        

        
    } 
}
