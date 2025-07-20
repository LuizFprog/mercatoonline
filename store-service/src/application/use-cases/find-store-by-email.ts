import { Injectable,NotFoundException,Inject } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { find } from 'rxjs';

@Injectable()
export class FindByEMAILStoreService {
    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
        ) {}

    async execute(email: string){

        const findemail = await this.storeRepository.findByEmail(email);

        if(!findemail)
        {
            throw new NotFoundException(`Loja com E-mail ${email} não encontrado.`)
        }
        return findemail;
    }
}
