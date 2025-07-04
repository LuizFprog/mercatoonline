import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersGatewayController } from './users.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [UsersGatewayController],
})
export class UsersGatewayModule {}
