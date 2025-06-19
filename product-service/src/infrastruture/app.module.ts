import { Module } from '@nestjs/common';
import { AppController } from '../interfaces/app.controller';
import { AppService } from '../application/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
