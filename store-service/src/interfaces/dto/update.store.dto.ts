import { IsEmail,IsString,ValidateNested, IsOptional} from 'class-validator';
import { Type } from 'class-transformer'
import { CreateAddressDto } from './create-address.dto'

export class UpdateStoreDTO {

  @IsString() @IsOptional() name?: string;
  @IsEmail() @IsOptional() email?: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() logo_url?: string;

  @IsOptional() @ValidateNested()  @Type(() => CreateAddressDto) address?: CreateAddressDto;
}
