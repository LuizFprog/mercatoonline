import { Controller, Get, Post, Delete, Param, Body, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller('orders')
export class OrdersGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    super(httpService, 'order-service', 'http://order-service:3000/order');
  }

  @Post()
  async create(@Body() createDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', res, data: createDto });
  }

  @Get()
  async findAll(@Res() res: Response) {
    await this.proxyRequest({ method: 'GET', res });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: `/${id}`, res });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'DELETE', path: `/${id}`, res });
  }
}