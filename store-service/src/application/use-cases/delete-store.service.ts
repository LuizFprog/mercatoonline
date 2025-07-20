import { Injectable, NotFoundException,Inject} from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DeleteStoreService {
    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
      ) {}

    async execute(id:number){

        const findid= await this.storeRepository.findById(id)

        if(!findid){
            throw new NotFoundException(`Loja com ID ${id} não encontrado.`);
        }

        this.natsClient.emit('store.deleted', findid);
        console.log(`[Store-Service] Evento 'store.deleted' publicado para a loja ID: ${findid.name}`);


        return this.storeRepository.delete(id);
    }
}
