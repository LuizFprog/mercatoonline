import { Injectable,NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo'
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto/create-user.dto'


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

  async findByEmail(email: string) {
     return await this.prisma.user.findUnique({
      where: { email },
      select: this.userSelect,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async create(data: CreateUserDto) {
    
    const { address, ...userData } = data;

    return this.prisma.user.create({
      data: {
        ...userData,
        addresses: {
          create: [
            {
              street: address.street,
              number: address.number,
              cep: address.cep,
              complement: address.complement,
              city: {
                connect: { id: address.cityId },
              },
            },
          ],
        },
      },
      select: this.userSelect,
    });
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: data,
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
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      throw error;
    }
  }
}
