import { Module } from '@nestjs/common';
import { CartPrismaRepositoryService } from './repositories/cart-prisma.repository/cart-prisma.repository.service';


@Module({
  providers: [CartPrismaRepositoryService]
})
export class DatabaseModule {}
