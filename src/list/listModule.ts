import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './listController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Card } from '../card/entities/card.entity';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [TypeOrmModule.forFeature([List, Card]), SupabaseModule],
})
export class ListModule {}
