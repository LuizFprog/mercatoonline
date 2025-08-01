import { User } from '@prisma/client';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  findById(id: number);
  findByCPF(cpf: string);
  findByPhone(phone: string);
  findByEmail(email: string);
  findAll();
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'addresses'>);
  update(id: number, data: Partial<User>);
  delete(id: number): Promise<void>;
}