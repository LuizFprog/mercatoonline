import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './infrastructure/users/users.module';
import { HealthModule } from './health/health.module';
import { LocationModule } from './infrastructure/users/location.module';
import {AuthModule} from './infrastructure/users/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    HealthModule, 
    LocationModule,
    AuthModule,
  ],
})
export class AppModule {}