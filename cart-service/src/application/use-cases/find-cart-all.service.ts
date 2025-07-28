import { Injectable, Inject} from '@nestjs/common';
import {ICartRepository } from 'src/domain/repositories/cart.repository.interface'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindCartAllService {

    constructor(
                @Inject(ICartRepository)
                private readonly cartPrisma: ICartRepository,
                @Inject('NATS_SERVICE')
                private readonly natsClient: ClientProxy,
              ) {}

    async execute(){

        try{

            const cart = await this.cartPrisma.findAllCart();

            if(!cart){
                throw new Error(`Lista de carrinhos não existem`);
            }
            return cart;
        }
        catch
        {
               throw new Error(`Erro ao exibir lista de carrinhos`);
        }
        
    } 
}
