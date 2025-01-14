import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '../../card/entities/card.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.comments)
  card: Card;

  @Column('text')
  text: string;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
