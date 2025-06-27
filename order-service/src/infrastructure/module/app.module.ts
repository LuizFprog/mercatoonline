import { Module } from '@nestjs/common';
import { AppController } from '../../interface/app.controller';
import { AppService } from '../../application/app.service';
import { OrderModule } from './order.module';   

@Module({
  imports: [OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
