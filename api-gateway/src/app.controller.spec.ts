// server/app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OPERATION } from './utils/enums';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
    it('handle 10 + 10 should be 20', () => {
      expect(appController.handleCalculate({
        operation: OPERATION.sum,
        a: 10,
        b:10
      })).toBe({
        result: 20
      });
    });
  });

  
});
