import { Controller, Get, Post, Patch, Delete, Param, Body, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller('users')
export class UsersGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    super(httpService, 'user-service', 'http://user-service:3000/users');
  }

  @Post()
  async createUser(@Body() createDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'POST', res, data: createDto });
  }

  @Get()
  async findAllUsers(@Res() res: Response) {
    await this.proxyRequest({ method: 'GET', res });
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'GET', path: `/${id}`, res });
  }
  
  @Get('/by-cpf/:cpf')
  async findUserByCpf(@Param('cpf') cpf: string, @Res() res: Response) {
      await this.proxyRequest({ method: 'GET', path: `/by-cpf/${cpf}`, res });
  }

  @Get('/by-email/:email')
  async findUserByEmail(@Param('email') email: string, @Res() res: Response) {
      await this.proxyRequest({ method: 'GET', path: `/by-email/${email}`, res });
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() updateDto: any, @Res() res: Response) {
    await this.proxyRequest({ method: 'PATCH', path: `/${id}`, res, data: updateDto });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.proxyRequest({ method: 'DELETE', path: `/${id}`, res });
  }
}
