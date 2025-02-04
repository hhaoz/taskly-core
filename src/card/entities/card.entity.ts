import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from '../../list/entities/list.entity';
import { ChecklistItem } from '../../checklist-item/entities/checklist-item.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../user/entities/user.entity';
import { BoardLabel } from '../../board_label/entities/board_label.entity';
import { CardAttachment } from '../../card_attachment/entities/card_attachment.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.cards)
  members: User[];

  @Column()
  description: string;

  @Column()
  position: number;

  @Column('timestamptz', { nullable: true })
  dueDate: Date;

  @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
  list: List;

  @OneToMany(() => Comment, (comment) => comment.card, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => ChecklistItem, (checklistItem) => checklistItem.card, {
    onDelete: 'CASCADE',
  })
  checklistItems: ChecklistItem[];

  @ManyToMany(() => BoardLabel, (boardLabel) => boardLabel.cards)
  labels: BoardLabel[];

  @OneToMany(() => CardAttachment, (cardAttachment) => cardAttachment.card, {
    onDelete: 'CASCADE',
  })
  cardAttachments: CardAttachment[];
}
