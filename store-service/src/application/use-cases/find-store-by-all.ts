import { Injectable,Inject } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FindByAllStoreService {
    constructor(
    @Inject(IStoreRepository)
    private readonly storeRepository: IStoreRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
    ) {}

    async execute(){
        const findAll = await this.storeRepository.findAll();

        if(!findAll || findAll.length===0){
            return [];
        }

        return findAll
    }
}
