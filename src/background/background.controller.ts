import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { BackgroundService } from './background.service';
import { CreateBackgroundDto } from './dto/create-background.dto';
import { UpdateBackgroundDto } from './dto/update-background.dto';

@Controller('background')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @Get('all')
  findAllPredefined() {
    return this.backgroundService.findAllPredefined();
  }
}
