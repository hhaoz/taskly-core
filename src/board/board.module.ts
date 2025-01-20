import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [TypeOrmModule.forFeature([Board]), SupabaseModule],
})
export class BoardModule {}
