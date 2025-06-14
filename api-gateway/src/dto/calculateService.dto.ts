import { IsEnum, IsNumber, IsOptional} from 'class-validator'
import {OPERATION} from '../utils/enums'

export class CalculateServiceDto {
    @IsEnum(OPERATION)
    operation: OPERATION;

    @IsNumber()
    a: number;

    @IsNumber()
    b: number;

    @IsNumber()
    @IsOptional()
    c?: number;

    @IsNumber()
    @IsOptional()
    d?: number;
}