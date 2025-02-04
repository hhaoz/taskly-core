import { Module } from '@nestjs/common';
import { CardAttachmentService } from './card_attachment.service';
import { CardAttachmentController } from './card_attachment.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [CardAttachmentController],
  providers: [CardAttachmentService],
  imports: [SupabaseModule],
})
export class CardAttachmentModule {}
