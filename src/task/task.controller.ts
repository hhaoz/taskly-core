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
  create(@Body() createTaskDto: CreateTaskDto[]) {
    return this.taskService.create(createTaskDto);
  }

  @Get('cards')
  findAllCards() {
    return this.taskService.findAllCards();
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }
}
