import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './infrastructure/module/order.module';   
import { NatsClientModule } from './infrastructure/messaging/nats-client.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsClientModule,
    HealthModule,
    OrderModule,
  ],
})
export class AppModule {}
