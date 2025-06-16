// application/use-cases/login.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from 'auth/src/domain/repositories/user.repository';
// import { Hasher } from 'auth/src/domain/services/hasher.interface';
// import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDTO } from 'auth/src/presentation/dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    // private readonly hasher: Hasher,
    // private readonly jwt: JwtService,

    // Producer Kafka é um ADAPTADOR DE SAÍDA (infra)
    @Inject('AUTH_PRODUCER') private readonly producer: ClientKafka,
  ) {}

  async execute(dto: LoginDTO) {
      return { status: 'ok', token: 'tokkkkken' };
  }
}
