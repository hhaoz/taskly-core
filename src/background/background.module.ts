import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [BackgroundController],
  providers: [BackgroundService],
  imports: [SupabaseModule],
})
export class BackgroundModule {}
