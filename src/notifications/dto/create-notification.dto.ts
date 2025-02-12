import { NotificationType } from '../../enums/notification-type.enum';
import { IsEnum } from 'class-validator';

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type: NotificationType;

  boardId: string;

  userId: string;
}
