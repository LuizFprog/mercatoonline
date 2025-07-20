import { Store, Prisma } from '@prisma/client';

export const IStoreRepository = Symbol('IStoreRepository');

export interface IStoreRepository {
  create(data: Prisma.StoreCreateInput): Promise<Store>;
  update(id: number, data: Prisma.StoreUpdateInput): Promise<Store>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Store | null>;
  findAll(): Promise<Store[]>;
  findByCNPJ(cnpj: string): Promise<Store | null>;
  findByEmail(email: string): Promise<Store | null>; 
  findByName(name: string): Promise<Store[]>;
}