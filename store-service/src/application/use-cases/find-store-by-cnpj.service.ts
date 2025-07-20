import { Injectable,NotFoundException,Inject } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindByCNPJStoreService {
    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
        ) {}

    async execute(cnpj: string){

        const findCNPJ = await this.storeRepository.findByCNPJ(cnpj);

        if(!findCNPJ)
        {
            throw new NotFoundException(`Loja com CNPJ ${cnpj} não encontrado.`)
        }
        return findCNPJ;
    }
}
