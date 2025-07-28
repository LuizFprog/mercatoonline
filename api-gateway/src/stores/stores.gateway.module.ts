import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StoresGatewayController } from './stores.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [StoresGatewayController],
})
export class StoreGatewayModule {}
