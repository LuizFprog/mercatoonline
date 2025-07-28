import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { CartsModule } from './infrastructure/module/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CartsModule,
    HealthModule, 
  ],
})
export class AppModule {}
