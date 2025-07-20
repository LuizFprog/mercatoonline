import { Injectable, Inject} from '@nestjs/common';
import {ICartRepository } from 'src/domain/repositories/cart.repository.interface'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindCartByIdService {

    constructor(
                @Inject(ICartRepository)
                private readonly cartPrisma: ICartRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}

    async execute(id:number){

        try{

            const cart = await this.cartPrisma.findById(id);

            if(!cart){
                throw new Error(`Carinho com ID ${id} não encontrado`);
            }
            return cart;
        }
        catch
        {
               throw new Error(`Erro ao pesquisar carrinho por ID`);
        }
        
    } 
}
