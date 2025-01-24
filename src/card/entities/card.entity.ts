import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { ChecklistItem } from '../../checklist-item/entities/checklist-item.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../user/entities/user.entity';
import { BoardLabel } from '../../board_label/entities/board_label.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Task, (task) => task.cards, { onDelete: 'CASCADE' })
  task: Task;

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
}
