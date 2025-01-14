import { CreateCardDto } from '../../card/dto/create-card.dto';

export class CreateTaskDto {
  title: string;
  cards: CreateCardDto[];
}
