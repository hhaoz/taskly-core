import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Comment } from '../comment/entities/comment.entity';
import { ChecklistItem } from '../checklist-item/entities/checklist-item.entity';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [TypeOrmModule.forFeature([Card, Comment, ChecklistItem])],
})
export class CardModule {}
