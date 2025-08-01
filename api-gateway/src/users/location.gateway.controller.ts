import { Controller, Get, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { BaseGatewayController } from '../base.gateway.controller';

@Controller() 
export class LocationGatewayController extends BaseGatewayController {
  constructor(httpService: HttpService) {
    super(httpService, 'user-service', 'http://user-service:3000');
  }

  @Get('states') 
  findAllStates(@Req() req: Request, @Res() res: Response) {
    return this.proxyRequest({
      method: 'GET',
      path: req.originalUrl, // O path será /states
      res: res,
    });
  }

  @Get('states/:stateId/cities') 
  findCitiesByState(@Req() req: Request, @Res() res: Response) {
    return this.proxyRequest({
      method: 'GET',
      path: req.originalUrl, 
      res: res,
    });
  }

  @Get('cities/:cityId') 
  proxyCities(@Req() req: Request, @Res() res: Response) {
    return this.proxyRequest({ method: req.method as any, path: req.originalUrl, res, data: req.body });
  }
}