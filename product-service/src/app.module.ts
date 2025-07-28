import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsClientModule } from './infrastructure/messaging/nats-client.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { CategoriesModule } from './infrastructure/module/categories.module';
import { ProductsModule } from './infrastructure/module/products.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    NatsClientModule,
    HealthModule, 
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}