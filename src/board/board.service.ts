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

  async findAll(uid: string) {
    const { data, error } = await this.supabase.supabase
      .from('board')
      .select()
      .eq('ownerId', uid);
    if (error) {
      return error.message;
    }

    return data;
  }

  async remove(id: string) {
    return this.supabase.supabase.from('board').delete().eq('id', id);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const { data, error } = await this.supabase.supabase
      .from('board')
      .update({
        name: updateBoardDto.name,
      })
      .eq('id', id)
      .single();
    if (error) {
      return error.message;
    }

    return data;
  }
}
