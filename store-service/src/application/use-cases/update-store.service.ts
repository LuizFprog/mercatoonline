import { Injectable,NotFoundException,Inject } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateStoreService {

    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
        ) {}

    async execute(id:number,body:any){

        const dataToUpdate=body;

        const findid= await this.storeRepository.findById(id)
        
        if(!findid){
            throw new NotFoundException(`Loja com ID ${id} não encontrado.`);
        }

        if (body.password) {
         
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(body.password, saltRounds);
            
            dataToUpdate.password = hashedPassword;
    }
        const updateStore = this.storeRepository.update(id,dataToUpdate)

        this.natsClient.emit('store.updated', updateStore);
        console.log(`[Store-Service] Evento 'store.updated' publicado para a loja ID: ${(await updateStore).email}`);

        return updateStore;
    }
}
