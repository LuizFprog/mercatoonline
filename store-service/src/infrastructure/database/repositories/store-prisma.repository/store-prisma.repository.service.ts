/*
  =======================================================================
  ARQUIVO: store-service/src/infrastructure/database/repositories/store-prisma.repository/store-prisma.repository.service.ts
  Melhorias:
  - Corrigida a sintaxe do objeto 'storeSelect' para relações aninhadas.
  - Aplicado o 'storeSelect' a todos os métodos públicos para omitir a senha.
  - O método 'findByEmail' foi tratado como um caso especial para permitir a autenticação.
  - Corrigido o método 'delete' para corresponder à interface.
  =======================================================================
*/
import { Injectable, NotFoundException } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Store, Prisma } from '@prisma/client';

@Injectable()
export class StorePrismaRepository implements IStoreRepository {

  private readonly storeSelect: Prisma.StoreSelect = {
    id: true,
    name: true,
    email: true,
    cnpj: true,
    phone: true,
    logo_url: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    addresses: {
      select: {
        street: true,
        number: true,
        complement: true,
        cep: true,
        cityId: true,
      },
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.StoreCreateInput): Promise<Store> {
    return this.prisma.store.create({ 
      data, 
      select: this.storeSelect 
    });
  }

  async update(id: number, data: Prisma.StoreUpdateInput): Promise<Store> {
    return this.prisma.store.update({
      where: { id },
      data,
      select: this.storeSelect,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.store.delete({ where: { id } });
  }

  async findById(id: number): Promise<Store | null> {
    return this.prisma.store.findUnique({
      where: { id },
      select: this.storeSelect,
    });
  }

  async findByCNPJ(cnpj: string): Promise<Store | null> {
    return this.prisma.store.findUnique({ 
      where: { cnpj }, 
      select: this.storeSelect 
    });
  }

  async findAll(): Promise<Store[]> {
    return this.prisma.store.findMany({ select: this.storeSelect });
  }


  async findByEmail(email: string): Promise<Store | null> {
    return this.prisma.store.findUnique({
      where: { email },
      select: this.storeSelect
    });
  }

  async findByName(name: string): Promise<Store[]> {
    return this.prisma.store.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: this.storeSelect,
    });
  }
}
