import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Card } from '../card/entities/card.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TaskService {
  constructor(private supbaseService: SupabaseService) {}

  async create(createTasksDto: CreateTaskDto[], boardId: string) {
    if (!createTasksDto){
      throw new BadRequestException('No tasks provided');
    }

    if (boardId) {
      const { data, error } = await this.supbaseService.supabase
        .from('board')
        .select()
        .eq('id', boardId);
      if (error) {
        throw new BadRequestException(error.message);
      }
      if (data.length === 0) {
        throw new NotFoundException('Board not found');
      }
    }
    console.log(createTasksDto);
    const tasks = createTasksDto.map((task,index) => {
      return {
        title: task.title,
        boardId,
        position: index,
      };
    });

    const { data, error } = await this.supbaseService.supabase
      .from('task')
      .upsert(tasks)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }

    let taskIds = data.map((task) => task.id);

    let cards = [];
    for (let i = 0; i < createTasksDto.length; i++) {
      for (let j = 0; j < createTasksDto[i].cards.length; j++) {
        cards.push({
          title: createTasksDto[i].cards[j].title,
          description: createTasksDto[i].cards[j].description,
          taskId: taskIds[i],
          position: j,
        });
      }
    }
    const { data: cardsData, error: cardsError } =
      await this.supbaseService.supabase.from('card').upsert(cards).select();
    if (cardsError) {
      throw new BadRequestException(cardsError.message);
    }

    console.log(cardsData);

    return data;
  }

  async findAllCardsInTasks(boardId: string) {
    const { data: board, error: boardError } = await this.supbaseService.supabase.from('board').select().eq('id', boardId);
    if (board.length === 0) {
      throw new BadRequestException('Board not found');
    }

     const {data: tasks, error} = await this.supbaseService.supabase
      .from('task')
      .select()
      .eq('boardId', boardId);

    for (let task of tasks) {
      const { data, error } = await this.supbaseService.supabase
        .from('card')
        .select()
        .eq('taskId', task.id)
        .order('position');
      if (error) {
        throw new BadRequestException(error.message);
      }
      task.cards = data;
      for (let card of task.cards) {
        delete card.position;
      }
    }
    return tasks;
  }

  findAll() {}
}
