import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Card } from '../card/entities/card.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.cardRepository
      .findOne({ where: { id: createCommentDto.cardId } })
      .then((card) => {
        if (!card) {
          throw new Error('Card not found');
        }

        const comment = this.commentRepository.create({
          text: createCommentDto.text,
          card: card,
        });

        return this.commentRepository.save(comment);
      });
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
