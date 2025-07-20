import { Injectable,NotFoundException,Inject } from '@nestjs/common';
import { find } from 'rxjs';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindByIDStoreService {
    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
        ) {}

    async execute(id:number){

        const findId = await this.storeRepository.findById(id)

        if(!findId){
            throw new NotFoundException(`Loja com ID ${id} não encontrado.`);
        }
        return findId;
    }
}
