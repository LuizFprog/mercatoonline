import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller('categories')
export class CategoriesGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    super(httpService, 'product-service (categories)', 'http://product-service:3000/categories');
  }

  @Post()
  async createCategory(@Body() createDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', res, data: createDto });
  }

  @Get()
  async findAllCategories(@Res() res: Response) {
    await this.proxyRequest({ method: 'GET', res });
  }

  @Get('/:id')
  async findCategoryById(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: `/${id}`, res });
  }
}
