import {
  Inject,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUserRepository } from 'src/domain/interface.repository/user.interface.repository/user.repository.interface';
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto/create-user.dto';
import { User,Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CreateUser {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('NATS_SERVICE')
    private readonly natsClient: ClientProxy,
  ) {}

  async execute(data: CreateUserDto): Promise<Omit<User, 'password'>> {


    const { address, password, ...userData } = data;

    const emailExists = await this.userRepository.findByEmail(userData.email);
    if (emailExists) {
      throw new ConflictException(`Usuário com o e-mail ${userData.email} já existe.`);
    }

    const cpfExists = await this.userRepository.findByCPF(userData.cpf);
    if (cpfExists) {
      throw new ConflictException(`Usuário com o CPF ${userData.cpf} já existe.`);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUserInput: Prisma.UserCreateInput = {
      ...userData,
      password: hashedPassword,
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
    };
    
    const newUser = await this.userRepository.create(createUserInput);

    try {
      this.natsClient.emit('user.created', newUser);
      console.log(`Evento 'user.created' publicado para o usuário: ${newUser.email}`);
    } catch (error) {
      console.error('ERRO ao publicar evento no NATS:', error);
    }
        
    return newUser;
  }
}