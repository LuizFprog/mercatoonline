import { User } from '../../entities/user/user'

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'addresses'>): Promise<User>;
}