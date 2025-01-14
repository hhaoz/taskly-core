import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Card } from '../card/entities/card.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private supbaseService: SupabaseService,
  ) {}

  async create(createTasksDto: CreateTaskDto[]) {
    let promises = createTasksDto.map((createTaskDto) => {
      return this.supbaseService.supabase.from('task').upsert(createTaskDto);
    });
    console.log(promises);
    return Promise.all(promises);
  }

  findAllCards() {
    return this.supbaseService.fetchCards();
  }

  findAll() {
    return this.taskRepository.find({ relations: ['cards'] });
  }
}
