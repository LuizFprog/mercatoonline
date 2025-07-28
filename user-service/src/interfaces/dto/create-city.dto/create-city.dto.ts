import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  stateId: number;  
}