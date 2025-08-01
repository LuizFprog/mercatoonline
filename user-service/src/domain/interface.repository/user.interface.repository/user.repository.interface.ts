import { User, Prisma } from '@prisma/client';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>>;
  update(id: number, data: Prisma.UserUpdateInput): Promise<Omit<User, 'password'>>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Omit<User, 'password'> | null>;
  findAll(): Promise<Omit<User, 'password'>[]>;
  findByCPF(cpf: string): Promise<Omit<User, 'password'> | null>;
  findByEmail(email: string): Promise<User | null>; // Precisa retornar a senha para o auth
  findByPhone(phone: string): Promise<Omit<User, 'password'> | null>;
}