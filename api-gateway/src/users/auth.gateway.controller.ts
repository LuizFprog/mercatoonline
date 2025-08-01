import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller('auth')
export class AuthGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    super(httpService, 'user-service', 'http://user-service:3000');
  }

  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    return this.proxyRequest({
      method: 'POST',
      path: req.originalUrl, // O path será /auth/login
      res: res,
      data: req.body,
    });
  }
}