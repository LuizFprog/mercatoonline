import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  
  private readonly userSelect = {
    id: true,
    name: true,
    email: true,
    cpf: true,
    phone: true,
    typeUser: true,
    createdAt: true,
    updatedAt: true,
    addresses: {
      include: {
        city: {
          include: {
            state: true,
          },
        },
      },
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
  }

  async findByCPF(cpf: string) {
    return this.prisma.user.findUnique({
      where: { cpf },
      select: this.userSelect,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  
  async findByPhone(phone: string) {
    return this.prisma.user.findFirst({
      where: { phone },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
      select: this.userSelect,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}