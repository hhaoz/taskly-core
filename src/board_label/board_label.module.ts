import { Module } from '@nestjs/common';
import { BoardLabelService } from './board_label.service';
import { BoardLabelController } from './board_label.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [BoardLabelController],
  providers: [BoardLabelService],
  imports: [SupabaseModule],
})
export class BoardLabelModule {}
