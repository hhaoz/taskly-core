import { Injectable } from '@nestjs/common';
import { CreateBoardLabelDto } from './dto/create-board_label.dto';
import { UpdateBoardLabelDto } from './dto/update-board_label.dto';

@Injectable()
export class BoardLabelService {
  create(createBoardLabelDto: CreateBoardLabelDto) {
    return 'This action adds a new boardLabel';
  }

  findAll() {
    return `This action returns all boardLabel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boardLabel`;
  }

  update(id: number, updateBoardLabelDto: UpdateBoardLabelDto) {
    return `This action updates a #${id} boardLabel`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardLabel`;
  }
}
