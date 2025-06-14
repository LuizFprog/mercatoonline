import { Injectable } from '@nestjs/common';
import { CalculateResultServiceDto } from './dto/calculateResultService.dto';
import { CalculateServiceDto } from './dto/calculateService.dto';
import { OPERATION } from './utils/enums';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async calculate(data: CalculateServiceDto): Promise<CalculateResultServiceDto> {
    const a = data.a;
    const b = data.b;
    switch (data.operation) {
      case OPERATION.sum: return {result:a + b};
      case OPERATION.sub: return {result:a - b};
      case OPERATION.mul: return {result:a * b};
      case OPERATION.div: return b !== 0 ? {result:a / b}: {message: "O divisor deve ser diferente de 0"};
      default: return {message: "Operação não registrada"}
    }
  }


}


