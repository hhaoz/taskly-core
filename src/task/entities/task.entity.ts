import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '../../card/entities/card.entity';
import { Board } from '../../board/entities/board.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Card, (card) => card.task)
  cards: Card[];

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;
}
