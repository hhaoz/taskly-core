import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Card } from '../card/entities/card.entity';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task, Card]), SupabaseModule],
})
export class TaskModule {}
