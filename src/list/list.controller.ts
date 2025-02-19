import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() req: { boardId: string; lists: CreateListDto[] }) {
    console.log(req);
    return this.listService.create(req.lists, req.boardId);
  }

  @Post('new-list')
  createNewList(@Body() req: { boardId: string; list: CreateListDto }) {
    return this.listService.createNewLists(req.list, req.boardId);
  }

  @Get('cards/:boardId')
  findAllCards(@Param('boardId') boardId: string) {
    console.log(boardId);
    return this.listService.findAllCardsInLists(boardId);
  }

  @Put('update-list/card')
    updateListCard(@Body() req: { previousList: UpdateListDto; list: UpdateListDto; boardId: string }) {
    console.log(req);
        return this.listService.updateListCard(req.previousList, req.list, req.boardId);
    }


  @Put('update-lists')
  updateLists(@Body() req: { lists: UpdateListDto[]; boardId: string }) {
    return this.listService.updateLists(req.lists, req.boardId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(id);
  }
}
