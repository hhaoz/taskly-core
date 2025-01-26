import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @Req() req: any) {
    console.log(req.user.uid);
    return this.boardService.create(createBoardDto, req.user.uid);
  }

  @Get('get-all-by-uid')
  findAll(@Req() req: any) {
    return this.boardService.findAll(req.user.uid);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.boardService.findOne(+id);
  // }

  //update name
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
