import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardAttachmentService } from './card_attachment.service';
import { CreateCardAttachmentDto } from './dto/create-card_attachment.dto';
import { UpdateCardAttachmentDto } from './dto/update-card_attachment.dto';

@Controller('card-attachment')
export class CardAttachmentController {
  constructor(private readonly cardAttachmentService: CardAttachmentService) {}

  @Post('/upload-file')
  create(@Body() createCardAttachmentDto: CreateCardAttachmentDto) {
    return this.cardAttachmentService.create(createCardAttachmentDto);
  }

  @Get()
  findAll() {
    return this.cardAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardAttachmentDto: UpdateCardAttachmentDto,
  ) {
    return this.cardAttachmentService.update(+id, updateCardAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardAttachmentService.remove(+id);
  }
}
