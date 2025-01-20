import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsNumber } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsNumber()
  id: string;
}
