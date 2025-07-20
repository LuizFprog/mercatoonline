import { Controller, Get, Post, Patch, Delete, Param, Body, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller('stores')
export class StoresGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    // A URL base inclui o caminho do recurso
    super(httpService, 'store-service', 'http://store-service:3000/stores');
  }

  @Post()
  async createStore(@Body() createDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', path: '', res, data: createDto });
  }

  @Get()
  async findAllStores(@Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: '', res });
  }

  @Get('/:id')
  async findStoreById(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: `/${id}`, res });
  }
  
  @Get('/cnpj/:cnpj')
  async findStoreByCnpj(@Param('cnpj') cnpj: string, @Res() res: Response) {
      await this.proxyRequest({ method: 'GET', path: `/cnpj/${cnpj}`, res });
  }

  @Get('/name/:name')
  async findStoreByName(@Param('name') name: string, @Res() res: Response) {
      await this.proxyRequest({ method: 'GET', path: `/name/${name}`, res });
  }

  @Get('/email/:email')
  async findStoreByEmail(@Param('email') email: string, @Res() res: Response) {
      await this.proxyRequest({ method: 'GET', path: `/email/${email}`, res });
  }

  @Patch('/:id')
  async updateStore(@Param('id') id: string, @Body() updateDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'PATCH', path: `/${id}`, res, data: updateDto });
  }

  @Delete('/:id')
  async deleteStore(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'DELETE', path: `/${id}`, res });
  }
}
