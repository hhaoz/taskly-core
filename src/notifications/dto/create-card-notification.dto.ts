import { NotificationType } from '../../enums/notification-type.enum';

export class CreateNotificationDto {
  type: NotificationType;
  cardId: string;
  userId: string;
}
