import { Res, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Response } from 'express';

export abstract class BaseGatewayController {
  constructor(
    protected readonly httpService: HttpService,
    private readonly serviceName: string,
    private readonly serviceBaseUrl: string,
  ) {}

  protected async proxyRequest(options: {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    path?: string;
    res: Response;
    data?: any;
  }) {
    const { method, path = '', res, data } = options;
    const url = `${this.serviceBaseUrl}${path}`;

    console.log(`[API Gateway] Proxying ${method} to ${url}`);

    try {
      const { data: responseData, status } = await firstValueFrom(
        this.httpService.request({
          method: method,
          url: url,
          data: data,
          timeout: 10000,
        }),
      );
      return res.status(status).json(responseData);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          console.error(`[API Gateway] Timeout ao chamar o ${this.serviceName}.`);
          return res.status(HttpStatus.GATEWAY_TIMEOUT).json({ message: `O serviço ${this.serviceName} não respondeu a tempo.` });
        }
        if (error.response) {
          console.error(`[API Gateway] Erro retornado pelo ${this.serviceName}:`, error.response.data);
          return res.status(error.response.status).json(error.response.data);
        }
      }
      console.error(`[API Gateway] Erro de proxy não tratado para ${this.serviceName}:`, error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `Erro ao se comunicar com o serviço '${this.serviceName}'.` });
    }
  }
}
