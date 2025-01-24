import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardLabelService } from './board_label.service';
import { CreateBoardLabelDto } from './dto/create-board_label.dto';
import { UpdateBoardLabelDto } from './dto/update-board_label.dto';

@Controller('board-label')
export class BoardLabelController {
  constructor(private readonly boardLabelService: BoardLabelService) {}

  @Post()
  create(@Body() createBoardLabelDto: CreateBoardLabelDto) {
    return this.boardLabelService.create(createBoardLabelDto);
  }

  @Get()
  findAll() {
    return this.boardLabelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardLabelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardLabelDto: UpdateBoardLabelDto) {
    return this.boardLabelService.update(+id, updateBoardLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardLabelService.remove(+id);
  }
}
