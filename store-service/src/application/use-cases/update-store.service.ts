import { Injectable,NotFoundException,Inject } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { Store, Prisma } from '@prisma/client';
import { UpdateStoreDTO } from 'src/interfaces/dto/update.store.dto';   

@Injectable()
export class UpdateStoreService {

    constructor(
        @Inject(IStoreRepository)
        private readonly storeRepository: IStoreRepository,
        @Inject('NATS_SERVICE')
        private readonly natsClient: ClientProxy,
        ) {}

    async execute(id:number,data:UpdateStoreDTO) {

         const { address, ...storeData } = data;

        const updatePayload: Prisma.StoreUpdateInput = {
            ...storeData,
        };

        const findid= await this.storeRepository.findById(id)
        
        if(!findid){
            throw new NotFoundException(`Loja com ID ${id} não encontrado.`);
        }

        if (address) {
            updatePayload.addresses = {
                updateMany: {
                    where: { storeId: id },
                    data: address,
                },
            };
        }

        const updateStore = await this.storeRepository.update(id, updatePayload);

        this.natsClient.emit('store.updated', updateStore);
        console.log(`[Store-Service] Evento 'store.updated' publicado para a loja ID: ${(await updateStore).email}`);

        return updateStore;
    }
}
