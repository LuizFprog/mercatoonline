// calculator-service/app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CalculateResultServiceDto } from './dto/calculateResultService.dto';
import { CalculateServiceDto } from './dto/calculateService.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('calculate')
  async calculate(data: CalculateServiceDto): Promise<CalculateResultServiceDto> {
    return await this.appService.calculate(data);
  }

  // @EventPattern('calculate')
  // // Com MessagePattern seria síncrona, esse worker varia ação e a api nest esperaria
  // // com event a api nest (gateway - chamado de "server" aqui) não precisa aguardar, a calculdora vai tratar de enviar a resposta quando ela terminar - de forma então assíncrona
  // calculate(data: any): CalculateResultServiceDto{
  //   return this.appService.calculate(data.value); // com message não precisa de .value, aqui data arrega dados do kafka
  // }
}
