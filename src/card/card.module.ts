import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Comment } from '../comment/entities/comment.entity';
import { ChecklistItem } from '../checklist-item/entities/checklist-item.entity';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [
    TypeOrmModule.forFeature([Card, Comment, ChecklistItem]),
    SupabaseModule,
  ],
})
export class CardModule {}
