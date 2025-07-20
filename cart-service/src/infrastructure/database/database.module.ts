import { Module } from '@nestjs/common';
import { CartPrismaRepository } from './repositories/cart-prisma.repository.service';


@Module({
  providers: [CartPrismaRepository]
})
export class DatabaseModule {}
