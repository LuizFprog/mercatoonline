import { Injectable,NotFoundException,Inject } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindByNameStoreService {
    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
        ) {}

    async execute(name: string){

        const findName = await this.storeRepository.findByName(name);
        
        if(!findName)
        {
            throw new NotFoundException(`Loja ${name} não encontrado.`)
        }
        
        return findName;
    }
}
