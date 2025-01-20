import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { ChecklistItem } from '../checklist-item/entities/checklist-item.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(ChecklistItem)
    private checklistItemRepository: Repository<ChecklistItem>,
  ) {}

  create(createCardDto: CreateCardDto) {}

  async findAll() {
    return await this.cardRepository.find({
      where: { id: 2 },
      relations: ['comments', 'checklistItems'],
    });
  }

  removeAll() {
    return this.cardRepository.delete({});
  }
}
