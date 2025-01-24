import { Module } from '@nestjs/common';
import { BoardLabelService } from './board_label.service';
import { BoardLabelController } from './board_label.controller';

@Module({
  controllers: [BoardLabelController],
  providers: [BoardLabelService],
})
export class BoardLabelModule {}
