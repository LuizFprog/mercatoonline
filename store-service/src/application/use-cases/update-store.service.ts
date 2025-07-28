import { Injectable,NotFoundException,Inject } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UpdateStoreService {

    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
        ) {}

    async execute(id:number,body:any){

        const findid= await this.storeRepository.findById(id)
        
        if(!findid){
            throw new NotFoundException(`Loja com ID ${id} não encontrado.`);
        }

        const updateStore = this.storeRepository.update(id,body)

        this.natsClient.emit('store.updated', updateStore);
        console.log(`[Store-Service] Evento 'store.updated' publicado para a loja ID: ${(await updateStore).email}`);

        return updateStore;
    }
}
