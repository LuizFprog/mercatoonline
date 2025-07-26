// src/modules/payment/services/payment.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

interface PixInterface {
  token: string;
}

interface ConfirmPixInterface {
  id: string;
}

@Injectable()
export class PaymentService {
  private payment: Payment;
  private jwtKey: string;

  constructor(private configService: ConfigService) {
    const accessToken = this.configService.get<string>('ACCESS_TOKEN');

    if (!accessToken) {
      throw new Error('ACCESS_TOKEN ou JWT_KEY não está definido no .env');
    }

    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });

    this.payment = new Payment(client);
  }

  private generateToken(user: any): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        cpf: user?.cpf,
      },
      this.jwtKey,
      { expiresIn: '1h' },
    );
  }

  async paymentPix(): Promise<any> {
    try {
      const body = {
        transaction_amount: 0.01,
        description: 'Pagamento inscrição premium',
        payment_method_id: 'pix',
        payer: {
          email: 'fontesdgfranca@gmail.com',
          identification: {
            type: 'CPF',
            number: '13496357401',
          },
        },
        notification_url:
          'https://5094-45-178-125-58.ngrok-free.app/payment/webhook',
      };

      const requestOptions = { idempotencyKey: uuidv4() };

      const result = await this.payment.create({ body, requestOptions });

      if (!result || !result.id || !result.date_of_expiration) {
        throw new Error('Falha ao processar pagamento');
      }

      return result;
    } catch (error: any) {
      console.error('Erro no pagamento Pix:', error);
      throw new InternalServerErrorException(
        error.message || 'Erro desconhecido no pagamento',
      );
    }
  }

  async confirmPix({ id }: ConfirmPixInterface): Promise<{
    status: string;
    message: string;
    data?: any;
  }> {
    try {
      const result = await this.payment.get({ id });
      if (!result) throw new Error('Pagamento não encontrado');

      return {
        status: result.status === 'approved' ? 'success' : 'pending',
        message:
          result.status === 'approved'
            ? 'Pagamento aprovado'
            : 'Pagamento não aprovado',
        data: result,
      };
    } catch (err: any) {
      console.error(err);
      return {
        status: 'error',
        message: err.message,
      };
    }
  }
}
