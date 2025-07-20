import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { Store, Prisma } from '@prisma/client';
import { CreateStoreDto } from 'src/interfaces/dto/create.store.dto';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    @Inject(IStoreRepository)
    private readonly storeRepository: IStoreRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
  ) {}

  async execute(data: CreateStoreDto): Promise<Omit<Store, 'password'>> {

    const { address, password, ...storeData } = data;

    const emailExists = await this.storeRepository.findByEmail(storeData.email);
    if (emailExists) {
      throw new ConflictException(`Loja com o email ${storeData.email} já existe.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createInput: Prisma.StoreCreateInput = {
      ...storeData,
      password: hashedPassword,
      addresses: {
        create: [address],
      },
    };

    const newStore = await this.storeRepository.create(createInput);

    this.natsClient.emit('store.created', newStore);
    console.log(`[Store-Service] Evento 'store.created' publicado para a loja ID: ${newStore.email}`);

    const { password: _, ...result } = newStore;
    return result;
  }
}