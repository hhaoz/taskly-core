import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class BoardService {
  constructor(private supabase: SupabaseService) {}

  create(createBoardDto: CreateBoardDto, userId: string) {
    const newBoard = {
      name: createBoardDto.name,
      createdAt: new Date(),
      ownerId: userId,
    };
    return this.supabase.supabase.from('board').upsert(newBoard);
  }

  findAll() {
    return `This action returns all board`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
