// user-service/src/interfaces/state/dto/create-state.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}