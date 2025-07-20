import { Controller, Get, Post, Delete, Param, Body, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller('carts')
export class CartGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    super(httpService, 'cart-service', 'http://cart-service:3000/carts');
  }

  @Post()
  async createCart(@Body() createDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', path: '', res, data: createDto });
  }

  @Post(':id/products')
  async addProductToCart(@Param('id') id: string, @Body() addProductDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', path: `/${id}/products`, res, data: addProductDto });
  }

  @Get(':id')
  async findCartById(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: `/${id}`, res });
  }

  @Delete(':id')
  async deleteCart(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'DELETE', path: `/${id}`, res });
  }
}