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
    const tasks = createTasksDto.map((task) => {
      return {
        title: task.title,
        boardId,
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
    createTasksDto.forEach((task, index) => {
      task.cards.forEach((card, index) => {
        cards.push({ ...card, taskId: taskIds[index], position: index });
      });
    });

    const { data: cardsData, error: cardsError } =
      await this.supbaseService.supabase.from('card').upsert(cards).select();
    if (cardsError) {
      throw new BadRequestException(cardsError.message);
    }

    console.log(cardsData);

    return data;
  }

  findAllCards() {
    return this.supbaseService.fetchCards();
  }

  findAll() {}
}
