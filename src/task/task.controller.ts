import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() req: { boardId: string; tasks: CreateTaskDto[] }) {
    return this.taskService.create(req.tasks, req.boardId);
  }

  @Get('cards/:boardId')
  findAllCards(@Param('boardId') boardId: string) {
    return this.taskService.findAllCardsInTasks(boardId);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }
}
