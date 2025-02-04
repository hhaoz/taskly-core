import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCardAttachmentDto } from './dto/create-card_attachment.dto';
import { UpdateCardAttachmentDto } from './dto/update-card_attachment.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CardAttachmentService {
  constructor(private supabase: SupabaseService) {}

  async create(createCardAttachmentDto: CreateCardAttachmentDto) {
    console.log(createCardAttachmentDto);

    const { error } = await this.supabase.supabase.storage
      .from('card_attachment')
      .upload(
        `${createCardAttachmentDto.cardId}/${createCardAttachmentDto.file.name}`,
        createCardAttachmentDto.file,
        {
          upsert: true,
          contentType: createCardAttachmentDto.file.type,
        },
      );
    if (error) {
      return new BadRequestException(error.message);
    }

    const { data } = this.supabase.supabase.storage
      .from('card_attachment')
      .getPublicUrl(
        `${createCardAttachmentDto.cardId}/${createCardAttachmentDto.file.name}`,
      );

    const newCardAttachment = {
      cardId: createCardAttachmentDto.cardId,
      fileUrl: data,
      fileName: createCardAttachmentDto.file.name,
    };

    return this.supabase.supabase
      .from('card_attachment')
      .insert(newCardAttachment)
      .select();
  }

  findAll() {
    return `This action returns all cardAttachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardAttachment`;
  }

  update(id: number, updateCardAttachmentDto: UpdateCardAttachmentDto) {
    return `This action updates a #${id} cardAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardAttachment`;
  }
}
