import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../../domain/interface.repository/user.interface.repository/user.repository.interface';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { User } from '../../../../domain/entities/user/user'; // Importe sua entidade de domínio

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        addresses: {
          include: {
            city: {
                include:{
                     state:true,
                }    
            } 
          },
        },
      },
    });
    return user as User | null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        addresses: {
          include: {
            city: {
                include:{
                     state:true,
                }    
            }
          },
        },
      },
    });
    return user as User | null;
  }
  
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'addresses'>): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: userData,
      include: {
        addresses: true,
      },
    });
    return newUser as User;
  }

  
}
