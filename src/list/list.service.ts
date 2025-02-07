import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { Card } from '../card/entities/card.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ListService {
  constructor(private supbaseService: SupabaseService) {}

  async create(createListDto: CreateListDto[], boardId: string) {
    if (!createListDto) {
      throw new BadRequestException('No lists provided');
    }

    if (boardId) {
      const { data, error } = await this.supbaseService.supabase
        .from('board')
        .select()
        .eq('id', boardId);
      if (error) {
        throw new BadRequestException(error.message);
      }
      if (data.length === 0) {
        throw new NotFoundException('Board not found');
      }
    }
    console.log(createListDto);
    const lists = createListDto.map((list, index) => {
      return {
        title: list.title,
        boardId,
        position: index,
      };
    });

    const { data, error } = await this.supbaseService.supabase
      .from('list')
      .upsert(lists)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }

    let listIds = data.map((list) => list.id);

    let cards = [];
    for (let i = 0; i < createListDto.length; i++) {
      for (let j = 0; j < createListDto[i].cards.length; j++) {
        cards.push({
          title: createListDto[i].cards[j].title,
          description: createListDto[i].cards[j].description,
          listId: listIds[i],
          position: j,
        });
      }
    }
    const { data: cardsData, error: cardsError } =
      await this.supbaseService.supabase.from('card').upsert(cards).select();
    if (cardsError) {
      throw new BadRequestException(cardsError.message);
    }

    console.log(cardsData);

    return data;
  }

  async findAllCardsInLists(boardId: string) {
    const { data: board, error: boardError } =
      await this.supbaseService.supabase
        .from('board')
        .select()
        .eq('id', boardId);
    if (board.length === 0) {
      throw new BadRequestException('Board not found');
    }

    const { data: lists, error } = await this.supbaseService.supabase
      .from('list')
      .select()
      .eq('boardId', boardId)
      .order('position');

    for (let list of lists) {
      const { data, error } = await this.supbaseService.supabase
        .from('card')
        .select()
        .eq('listId', list.id)
        .order('position');
      if (error) {
        throw new BadRequestException(error.message);
      }
      list.cards = data;
      for (let card of list.cards) {
        //select assigned users and board labels
        Promise.all([
          this.supbaseService.supabase
            .from('user_card')
            .select('userId')
            .eq('cardId', card.id),
          this.supbaseService.supabase
            .from('labels_cards')
            .select('boardLabelId')
            .eq('cardId', card.id),
        ]).then((results) => {
          card.assignedUsers = results[0].data;
          card.labels = results[1].data;
        });
      }
    }
    return lists;
  }

  async createNewLists(createListDto: CreateListDto, boardId: string) {
    if (!createListDto) {
      throw new BadRequestException('No list provided');
    }

    let lastPosition!: number;

    if (boardId) {
      const { data, error } = await this.supbaseService.supabase
        .from('board')
        .select()
        .eq('id', boardId);
      if (error) {
        throw new BadRequestException(error.message);
      }
      if (data.length === 0) {
        throw new NotFoundException('Board not found');
      }
    }

    const { data: lists, error: listsError } =
      await this.supbaseService.supabase
        .from('list')
        .select()
        .eq('boardId', boardId)
        .order('position', { ascending: false });
    if (listsError) {
      throw new BadRequestException(listsError.message);
    }

    if (lists.length === 0) {
      lastPosition = 0;
    } else {
      lastPosition = lists[0].position;
    }

    const list = {
      title: createListDto.title,
      boardId,
      position: lastPosition + 1,
    };

    const { data, error } = await this.supbaseService.supabase
      .from('list')
      .insert(list)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async updateLists(lists: UpdateListDto[], boardId: string) {
    if (!lists) {
      throw new BadRequestException('No lists provided');
    }

    if (boardId) {
      const { data, error } = await this.supbaseService.supabase
        .from('board')
        .select()
        .eq('id', boardId);
      if (error) {
        throw new BadRequestException(error.message);
      }
      if (data.length === 0) {
        throw new NotFoundException('Board not found');
      }
    } else {
      throw new BadRequestException('No boardId provided');
    }

    //update lists position by promise.all
    const updateLists = lists.map((list, index) => {
      return this.supbaseService.supabase
        .from('list')
        .update({ position: index })
        .eq('id', list.id)
        .select();
    });

    const [{ data, error }] = await Promise.all(updateLists);

    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supbaseService.supabase
      .from('list')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }
}
