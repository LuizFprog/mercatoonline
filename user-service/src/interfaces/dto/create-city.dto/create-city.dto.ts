// user-service/src/interfaces/city/dto/create-city.dto.ts
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  stateId: number;  
}