import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBackgroundDto } from '../../background/dto/create-background.dto';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  backgroundId: string;

  // @IsOptional()
  // @IsUUID()
  // predefinedBackgroundId?: string;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateBackgroundDto)
  // background?: CreateBackgroundDto;
}
