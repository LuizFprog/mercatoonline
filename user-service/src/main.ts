import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORREÇÃO: Escuta na porta 3000 em TODAS as interfaces de rede
  await app.listen(3000, '0.0.0.0'); 
  console.log(`User service is running on: ${await app.getUrl()}`);
}
bootstrap();