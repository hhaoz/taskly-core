import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { NotificationType } from '../../enums/notification-type.enum';
import { Board } from '../../board/entities/board.entity';
import { Card } from '../../card/entities/card.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @ManyToOne(() => User, (user) => user.sentNotifications)
  sender: User;

  @Column('text')
  type: NotificationType;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('boolean')
  read: boolean;

  @ManyToOne(() => Board, (board) => board.notifications, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @ManyToOne(() => Card, (card) => card.notifications, {
    onDelete: 'CASCADE',
  })
  card: Card;
}
