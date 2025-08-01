import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthLoginDto } from 'src/interfaces/dto/dto.auth.login/dto.auth.login';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, passwordIn: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
        });
        
        // CORREÇÃO: Usa 'password' em vez de 'passwordHash'
        if (user && await bcrypt.compare(passwordIn, user.password)) {
            return user;
        }
        return null;
    }

    async login(loginDto: AuthLoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Email ou senha inválidos.');
        }

        // CORREÇÃO: Usa 'name' em vez de 'nameuser'
        const payload = { sub: user.id, name: user.name };
        
        const { password, ...userResult } = user;

        return {
            message: 'Login realizado com sucesso!',
            access_token: this.jwtService.sign(payload),
            user: userResult,
        };
    }   
}