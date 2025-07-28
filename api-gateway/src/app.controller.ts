import { Controller } from '@nestjs/common';

@Controller('app')
export class AppController {

    private readonly services = {
    users: 'http://user-service:3000',
    stores: 'http://store-service:3000'
  };
}
