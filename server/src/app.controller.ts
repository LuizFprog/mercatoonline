// server/app.controller.ts
import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';
import { CalculateServiceDto } from './dto/calculateService.dto';
import { CalculateResultServiceDto } from './dto/calculateResultService.dto';

@Controller()
export class AppController {
  constructor(@Inject('CALC_SERVICE') private client: ClientKafka,
private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('calculate');
    await this.client.connect();

  }

  @Post('/calculate')
  async handleCalculate(@Body() data: CalculateServiceDto) : Promise<CalculateResultServiceDto>{
    const response = this.client.send('calculate', data)
    return { result: await firstValueFrom(response) };
  }
}
