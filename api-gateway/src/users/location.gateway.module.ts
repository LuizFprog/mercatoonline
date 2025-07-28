import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LocationGatewayController } from './location.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [LocationGatewayController],
})
export class LocationGatewayModule {}