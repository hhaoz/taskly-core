import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { ChecklistItem } from '../checklist-item/entities/checklist-item.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CardService {
  constructor(private supabase: SupabaseService) {}

  create(createCardDto: CreateCardDto) {
    this.supabase.supabase.from('card').upsert(createCardDto);
  }

  async findAll() {}

  removeAll() {}
}
