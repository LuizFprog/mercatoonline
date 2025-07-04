import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  // Objeto 'select' para garantir que a senha NUNCA seja retornada
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

  // CORRIGIDO: Métodos 'find' agora retornam o resultado diretamente.
  // A lógica de "não encontrado" (if !user) pertence ao Caso de Uso.
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
    // Retorna o usuário com a senha, pois pode ser usado para login.
    // O Caso de Uso será responsável por não expor a senha.
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  
  async findByPhone(phone: string) {
    // findFirst é mais apropriado se múltiplos usuários puderem ter o mesmo telefone.
    return this.prisma.user.findFirst({
      where: { phone },
      select: this.userSelect,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  // CORRIGIDO: O método 'create' agora só recebe os dados prontos e os cria.
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