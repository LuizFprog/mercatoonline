import {  IsNumber, IsOptional, IsString} from 'class-validator'
import { CalculateServiceDto } from './calculateService.dto';
import { PartialType } from '@nestjs/mapped-types';


export class CalculateResultServiceDto extends PartialType(CalculateServiceDto) {
    @IsNumber()
    @IsOptional()
    result?: number;

    @IsString()
    @IsOptional()
    message?: string;
}