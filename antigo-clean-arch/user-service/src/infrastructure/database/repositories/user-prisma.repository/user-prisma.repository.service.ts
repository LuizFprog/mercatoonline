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

    try{
        const user = await this.prisma.user.findUnique({
          where: { id },
          select: this.userSelect,
        });

      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      return user;

    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
    }
  }

  async findByEmail(email: string) {

    try{
        const findemail = await this.prisma.user.findUnique({
          where: { email },
          select: this.userSelect,
        });

        if (!findemail) {
          throw new NotFoundException(`Usuário com email ${email} não encontrado.`);  
        }
        return findemail;
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P  2025') {
          throw new NotFoundException(`Usuário com email ${email} não encontrado.`);  
        }
    }
     
  }

  async findAll() {
    try{
         return await this.prisma.user.findMany({
          select: this.userSelect,
        });
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Nenhum usuário encontrado.`);
      }
    } 
  }

  async create(data: CreateUserDto) {
    
    try{
      const { address, ...userData } = data;

      return await this.prisma.user.create({
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
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new NotFoundException(`Usuário com email ${data.email} já existe.`);
      }
      throw error;
    } 
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      const finduser = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!finduser) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      } 
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
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
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
