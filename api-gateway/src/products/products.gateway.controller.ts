import { Controller, Get, Post, Patch, Delete, Param, Body, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller('products')
export class ProductsGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    super(httpService, 'product-service', 'http://product-service:3000/products');
  }

  @Post()
  async createProduct(@Body() createDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', res, data: createDto });
  }

  @Get()
  async findAllProducts(@Res() res: Response) {
    await this.proxyRequest({ method: 'GET', res });
  }

  @Get('/:id')
  async findProductById(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: `/${id}`, res });
  }

  @Get('/categories/:id')
  async findProductsByCategoryId(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: `/categories/${id}`, res });
  }

  @Post('/price')
  async findProductByPrice(@Body() pricesDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', path: '/price', res, data: pricesDto });
  }

  @Patch('/:id')
  async updateProduct(@Param('id') id: string, @Body() updateDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'PATCH', path: `/${id}`, res, data: updateDto });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'DELETE', path: `/${id}`, res });
  }
}
