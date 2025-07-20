import { IsInt, IsNotEmpty, Min,IsEmail,Max,IsString,MinLength,ValidateNested, IsOptional} from 'class-validator';
import { Type } from 'class-transformer'
import { CreateAddressDto } from './create-address.dto'

export class UpdateStoreDTO {

  @IsString() @Min(1) @IsOptional() name?: string;
  @IsEmail() @IsOptional() email?: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() logo_url?: string;
  @IsString() @IsOptional() @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' }) password?: string;
  @IsOptional() @ValidateNested()  @Type(() => CreateAddressDto) address?: CreateAddressDto;
}
