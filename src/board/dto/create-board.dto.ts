import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
