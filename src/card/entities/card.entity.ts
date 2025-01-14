import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { ChecklistItem } from '../../checklist-item/entities/checklist-item.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Task, (task) => task.cards)
  task: Task;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  @OneToMany(() => ChecklistItem, (checklistItem) => checklistItem.card)
  checklistItems: ChecklistItem[];
}
